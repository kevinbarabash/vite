// @flow
import * as React from "react";

import Bar from "../src/bar.js";

describe("bar", () => {
    test("it should handle components that import other components", async () => {
        // Arrange
        const element = await render(<Bar/>);

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });
});
