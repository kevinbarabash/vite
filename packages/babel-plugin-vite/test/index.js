import plugin from "../src/index.js";
import fs from "fs";
import path from "path";

import {transform} from "@babel/core";

const options = {
    plugins: [
        [plugin, {functions: ["render"]}],
    ],
    parserOpts: {
        plugins: ["jsx"],
    },
};

describe("plugin", () => {
    for (const fixture of fs.readdirSync(path.join(__dirname, "fixtures"))) {
        test(fixture, () => {
            const filename = path.join(__dirname, "fixtures", fixture, "input.js");
            const input = fs.readFileSync(filename);
            const output = transform(
                input.toString(), Object.assign({}, options, {filename: filename, babelrc: false}));
            expect(output.code).toEqual(
                fs.readFileSync(path.join(__dirname, "fixtures", fixture, "output.js")).toString()
            );
        });
    }
});
