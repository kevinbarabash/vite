// @flow
import * as React from "react";

import Foo from "../src/foo.js";

describe("foo", () => {
    test("the title should be 'Hello, world!'", async () => {
        // Arrange
        const element = await render(<Foo msg="bar">Hello, world!</Foo>);

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });

    test("it should work arrow expressions", async () => {
        // Arrange
        const element = await render(() => {
            const msg = "Hello, world!";
            return <Foo msg="bar">{msg}</Foo>;
        });

        // Act
        const text = await element.getText();

        // Assert
        expect(text).toBe("Hello, world!");
    });
});
