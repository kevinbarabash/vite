import SeleniumEnvironment from 'jest-environment-selenium';
import {transformSync} from "@babel/core";
import istanbulLibCoverage from "istanbul-lib-coverage";
import ipc from "node-ipc";

class ViteEnvironment extends SeleniumEnvironment {
    constructor(config) {
        super(config);
        this.collectCoverage = config.testEnvironmentOptions.collectCoverage;
    }

    async setup() {
        await super.setup();
        if (this.collectCoverage) {
            this.coverageMap = istanbulLibCoverage.createCoverageMap({});
        }
        this.global.render = this.render.bind(this);
        this.global.__containers__ = [];
    }

    async teardown() {
        if (this.collectCoverage) {
            ipc.config.silent = true;
            ipc.connectTo('vite', () => {
                ipc.of.vite.on('connect', () => {
                    ipc.of.vite.emit('coverage', this.coverageMap.toJSON());
                });
            });
        }
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }

    /**
     * Renders a React element.
     * 
     * `data` can be passed either a React element or a thunk which returns a React element.
     * 
     * Note: you must use babel-plugin-vite to transform the test files using this function.  
     * This plugin looks at all calls to `render` and replaces the first argument with an 
     * object containing the original source of the argument along with the imports required 
     * to excute it.
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
    async render(data) {

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
            ...data.imports,
            `const container = document.createElement("container");`,
            `document.body.appendChild(container);`,
        ];

        if (data.code.startsWith("() =>")) {
            lines.push(`const element = (${data.code})();`);
        } else {
            lines.push(`const element = ${data.code};`);
        }

        lines.push(`ReactDOM.render(element, container, () => callback({container: container, coverage: window.__coverage__}));`);
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

        const {container, coverage} = await this.global.driver.executeAsyncScript(script, code);

        if (this.collectCoverage) {
            this.coverageMap.merge(coverage);
        }
        this.global.__containers__.push(container);

        return container;
    }
}

module.exports = ViteEnvironment;
