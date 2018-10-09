import {transformSync} from "@babel/core";
import istanbulApi from "istanbul-api";
import istanbulLibCoverage from "istanbul-lib-coverage";
import stoppable from "stoppable";

let server, coverageMap;

beforeAll(() => {
    server = require("vite-server");
    stoppable(server, 0);
    coverageMap = istanbulLibCoverage.createCoverageMap({});
});

afterAll(() => {
    const reporter = istanbulApi.createReporter();
    reporter.addAll(['json', 'text', 'lcov']);
    reporter.write(coverageMap);

    server.stop(() => console.log("stopping server"));
});

/**
 * Renders a React element.
 * 
 * `data` can be passed either a React element or a thunk which returns a React element.
 * 
 * Note: you must use babel-plugin-original-source to transform the test files using this
 * function.  This plugin looks at all calls to `render` and replaces the first argument
 * with an object containing the original source of the argument along with the imports
 * required to excute it.
 * 
 * e.g.
 * ```
 * import Foo from "../foo.js";
 * 
 * render(<Foo>Hello, world!</Foo>);
 * ```
 * 
 * will be converted to
 * ```
 * import Foo from "../foo.js";
 * 
 * render({
 *     code: "<Foo>Hello, world!</Foo>",
 *     imports: ["const Foo = (await import(\"../foo.js\")).default;"],
 * });
 * ```
 * 
 * The reason this is necessary is that node doesn't know how to deal with JSX natively
 * which means we have to precompile the code to run in node.  The mangles it in such a
 * way that it's hard to figure out what imports it uses.  We need this information so
 * that we can generate a snippet of code that can be run inside the browser via Selenium.
 * 
 * All code that Selenium runs inside the browser is in a separate context.  While we can
 * pass some data back and forth between the Selenium context and the node context, we
 * can't pass classes or functions which is why we have to import all of our dependencies
 * from within the Selenium context.
 */
export async function render(data) {
    /**
     * We use dynamic import statements so that we can run this code without
     * using a <script> tag.  This allows us to interact with the code we're
     * running allowing us to create a container element and pass it to the
     * callback we're passing in.
     */
    const lines = [
        `async () => {`,
        `const React = (await import("/node_modules/react.js")).default;`,
        `const ReactDOM = (await import("/node_modules/react-dom.js")).default;`,
        // TODO: automate path adjustments
        ...data.imports.map(line => line.replace("..", ".")),
        `const container = document.createElement("container");`,
        `document.body.appendChild(container);`,
    ];

    if (data.code.startsWith("() =>")) {
        lines.push(`const element = (${data.code})();`);
    } else {
        lines.push(`const element = ${data.code};`);
    }

    lines.push(`ReactDOM.render(element, container, () => callback({element: container, coverage: window.__coverage__}));`);
    lines.push("}");

    const {code} = transformSync(lines.join("\n"), {
        plugins: ["@babel/plugin-syntax-dynamic-import"],
        presets: ["@babel/preset-react"],
    });

    const script = function (code) {
        const callback = arguments[arguments.length - 1];
        const func = new Function("callback", `(${code.slice(0, -1)})()`);
        func(callback);
    };

    const {element, coverage} = await driver.executeAsyncScript(script, code);

    coverageMap.merge(coverage);

    return element;
}

/**
 * Removes an element containing a React component.
 */
export function cleanup(container) {
    return driver.executeScript((container) => {
        (async () => {
            const ReactDOM = (await import("/node_modules/react-dom.js")).default;
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
        })();
    }, container);
}
