/* global By */
// @flow
import * as React from "react";

import HiddenButton from "../src/hidden-button.js";

describe("HiddenButton", () => {
    test("it should respond to click without a cover", async () => {     
        const container = await render(<HiddenButton />);

        const button = await driver.findElement(By.tagName("button"));
        
        await driver.actions().click(button).perform();
        
        const text = await container.getText();
        expect(text).toBe("clicked");
    });

    test("it should not respond to click with a cover", async () => {     
        const container = await render(<HiddenButton cover={true} />);

        const button = await driver.findElement(By.tagName("button"));
        const size = await button.getSize();
        const location = await button.getLocation();
        
        await driver.actions().mouseMove({
            x: parseInt(location.x + size.width / 2), 
            y: parseInt(location.y + size.height / 2),
        }).click().perform();
        
        const text = await container.getText();
        expect(text).toBe("not yet");
    });
});
