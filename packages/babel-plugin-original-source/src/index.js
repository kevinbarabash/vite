import {declare} from "@babel/helper-plugin-utils";
import * as t from '@babel/types';
import generate from '@babel/generator';
import traverse from '@babel/traverse';

export default declare((api, options = {}) => {
    api.assertVersion(7);

    const imports = {};

    return {
        visitor: {
            ImportDeclaration(idPath) {
                const {node} = idPath;
                for (const specifier of node.specifiers) {
                    if (t.isImportDefaultSpecifier(specifier)) {
                        imports[specifier.local.name] =
                            `const {default: ${specifier.local.name}} = await import("${node.source.value}");`;
                        // imports[specifier.local.name] = generate(node).code;
                    }
                }
            },
            CallExpression(idPath) {
                const {node} = idPath;
                if (t.isIdentifier(node.callee, {name: "render"})) {
                    const identifiers = new Set();
                    traverse(
                        node.arguments[0], 
                        {
                            JSXIdentifier(path) {
                                if (path.isJSXIdentifier()) {
                                    identifiers.add(path.node.name);
                                }
                            }
                        },
                        idPath.scope,
                        idPath,
                    );

                    const usedImports = [];

                    usedImports.push(...[...identifiers].map(name => imports[name]));
                    // if (t.isJSXElement(node.arguments[0])) {
                    //     usedImports.push(...[...identifiers].map(name => imports[name]));
                    // } else if (t.isArrowFunctionExpression(node.arguments[0])) {
                    //     const {body} = node.arguments[0];

                    //     if (t.isBlockStatement(body)) {
                    //         const innerBody = body.body;
                    //         if (innerBody.length === 0) {
                    //             throw new Error("callback must return a value");
                    //         } else {
                    //             const last = innerBody.pop();

                    //             if (!t.isReturnStatement(last)) {
                    //                 throw new Error("callback must end with a return statement");
                    //             }

                    //             lines.push(...[...identifiers].map(name => imports[name]));
                    //             lines.push(...innerBody.map(child => generate(child).code));
                    //             lines.push(`const container = document.getElementById("container");`);
                    //             lines.push(`ReactDOM.render(${generate(last.argument).code}, container, callback);`);

                    //             node.arguments[0] = t.stringLiteral(lines.join("\n"));
                    //         }
                    //     } else if (t.isJSXElement) {
                    //         lines.push(...[...identifiers].map(name => imports[name]));
                    //         lines.push(`const container = document.getElementById("container");`);
                    //         lines.push(`ReactDOM.render(${generate(body).code}, container, callback);`);

                    //         node.arguments[0] = t.stringLiteral(lines.join("\n"));
                    //     }
                    // }

                    node.arguments[0] = t.objectExpression([
                        t.objectProperty(
                            t.identifier("code"),
                            t.stringLiteral(generate(node.arguments[0]).code),
                        ),
                        t.objectProperty(
                            t.identifier("imports"),
                            t.arrayExpression(usedImports.map(x => t.stringLiteral(x))),
                        ),
                    ]);
                }
            },
        },
    }
});
