import {transformSync} from "@babel/core";
import istanbulApi from "istanbul-api";
import istanbulLibCoverage from "istanbul-lib-coverage";
import stoppable from "stoppable";

let server, coverageMap, containers;

beforeEach(async () => {
    await driver.get("http://localhost:3000/");
});

// TODO: provide an option to only call driver.get() once
// We currently reload the page before each test.  This gets rid of any global 
// state a test or component might have created.  In some case we may
// know that no global state is being created in which case only calling
// driver.get() once will result in faster test runs.
// afterEach(async () => {
//     await driver.executeScript((containers) => {
//         (async () => {
//             const ReactDOM = (await import("/node_modules/react-dom.js")).default;
//             for (const container of containers) {
//                 ReactDOM.unmountComponentAtNode(container);
//                 document.body.removeChild(container);
//             }
//         })();
//     }, containers);
//     containers = [];
// });
