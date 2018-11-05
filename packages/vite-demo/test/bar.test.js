// @flow
import * as React from "react";

import Bar from "../src/bar.js";

describe("bar", () => {
    test("it should handle components that import other components", async () => {
        const element = await render(<Bar/>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
    });
});
