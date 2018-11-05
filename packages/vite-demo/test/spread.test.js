// @flow
import * as React from "react";

describe("bar", () => {
    test("it should handle components that import other components", async () => {
        // Arrange
        const element = await render(() => {
            const props = {
                id: "foo",
                className: "bar",
            };

            return <div {...props}>Hello, world!</div>;
        });

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });
});
