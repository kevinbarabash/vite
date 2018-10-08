import originalSourcePlugin from "../src/index.js";
import fs from "fs";
import path from "path";

import {transform} from "@babel/core";

const options = {
    plugins: [
        [originalSourcePlugin, {functions: ["render"]}],
    ],
    parserOpts: {
        plugins: ["jsx"],
    },
};

const readFile = (filename) =>
    fs.readFileSync(path.join(__dirname, filename)).toString();

describe("originalSourcePlugin", () => {
    for (const fixture of fs.readdirSync(path.join(__dirname, "fixtures"))) {
        test(fixture, () => {
            const input = fs.readFileSync(path.join(__dirname, "fixtures", fixture, "input.js"));
            const output = transform(input.toString(), options);
            expect(output.code).toEqual(
                fs.readFileSync(path.join(__dirname, "fixtures", fixture, "output.js")).toString()
            );
        });
    }
});
