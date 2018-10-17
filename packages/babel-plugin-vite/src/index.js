import path from "path";

import {declare} from "@babel/helper-plugin-utils";
import * as t from '@babel/types';
import generate from '@babel/generator';
import traverse from '@babel/traverse';

export default declare((api, options = {}) => {
    api.assertVersion(7);

    const imports = {};
    const cwd = process.cwd();

    return {
        visitor: {
            ImportDeclaration(idPath, state) {
                const {node} = idPath;
                const filename = path.relative(
                    cwd, 
                    path.join(path.dirname(state.file.opts.filename), node.source.value),
                );
                for (const specifier of node.specifiers) {
                    if (t.isImportDefaultSpecifier(specifier)) {
                        imports[specifier.local.name] =
                            `const {default: ${specifier.local.name}} = await import("./${filename}");`;
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

                    for (const identifier of identifiers) {
                        if (imports.hasOwnProperty(identifier)) {
                            usedImports.push(imports[identifier]);
                        }
                    }

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
