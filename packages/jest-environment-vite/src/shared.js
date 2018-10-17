/* eslint-disable no-console */
import createServer from "vite-server";
import stoppable from "stoppable";
import ipc from "node-ipc";
import istanbulApi from "istanbul-api";
import istanbulLibCoverage from "istanbul-lib-coverage";
import rp from "request-promise-native";

let server;

// store coverage maps from each jest worker
const coverageMaps = [];

// cache is shared between subsequent test runs when running `jest --watchAll`
const cache = {};

export async function setup(config) {
    const logger = {
        log(...args) {
            if (verbose) {
                console.log(...args);
            }
        },
    };

    const port = 3000;
    const {verbose} = config;
    server = createServer({port, verbose, cache});
    stoppable(server, 0);

    // TODO: automatically determine dependencies for the package being tested
    logger.log("compiling react");
    await rp("http://localhost:3000/node_modules/react.js");
    logger.log("compiling react-dom");
    await rp("http://localhost:3000/node_modules/react-dom.js");
    logger.log("compiling aphrodite");
    await rp("http://localhost:3000/node_modules/aphrodite.js");

    ipc.config.id = "vite";
    ipc.config.silent = true;
    ipc.serve(() => ipc.server.on("coverage", message => {
        coverageMaps.push(message);
    }));
    ipc.server.start();
}

export async function teardown(config) {
    const logger = {
        log(...args) {
            if (verbose) {
                console.log(...args);
            }
        },
    };

    server.stop(() => logger.log("stopping server"));
    ipc.server.stop();
    const {verbose} = config;

    if (coverageMaps.length > 0) {
        logger.log("merging coverage");
        const coverageMap = istanbulLibCoverage.createCoverageMap({});
        coverageMaps.forEach(map => coverageMap.merge(map));
    
        logger.log("writing coverage report");
        const reporter = istanbulApi.createReporter();
        reporter.addAll(config.coverageReporters);
        reporter.write(coverageMap);
    }
}
