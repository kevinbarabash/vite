/* eslint-disable no-console */
import createServer from "vite-server";
import stoppable from "stoppable";
import ipc from "node-ipc";
import istanbulApi from "istanbul-api";
import istanbulLibCoverage from "istanbul-lib-coverage";

let server;

// TODO: make this configurable
const port = 3000;
const coverageMaps = [];

export async function setup(config) {
    server = createServer(port);
    stoppable(server, 0);

    ipc.config.id = "vite";
    ipc.config.silent = true;
    ipc.serve(() => ipc.server.on("coverage", message => {
        coverageMaps.push(message);
    }));
    ipc.server.start();
}

export async function teardown(config) {
    server.stop(() => console.log("stopping server"));
    ipc.server.stop();

    console.log("merging coverage");
    const coverageMap = istanbulLibCoverage.createCoverageMap({});
    coverageMaps.forEach(map => coverageMap.merge(map));

    console.log("writing coverage report");
    const reporter = istanbulApi.createReporter();
    reporter.addAll(['json', 'text', 'lcov']);
    reporter.write(coverageMap);
}
