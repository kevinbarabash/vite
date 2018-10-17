// @flow
import HiddenButton from "../src/hidden-button.js";

describe("HiddenButton", () => {
    test("it should respond to click without a cover", async () => {     
        const container = await render(<HiddenButton />);

        const button = await driver.findElement(By.tagName("button"));
        const size = await button.getSize();
        const location = await button.getLocation();
        
        const actions = driver.actions();
        await actions.mouseMove({
            x: location.x + size.width / 2, 
            y: location.y + size.height / 2,
        }).click().perform();
        
        const text = await container.getText();
        expect(text).toBe("clicked");
    });

    // TODO: fix babel plugin to handle settings props on JSX elements
    // test("it should not respond to click with a cover", async () => {     
    //     const container = await render(<HiddenButton cover={true} />);

    //     const button = await driver.findElement(By.tagName("button"));
    //     const size = await button.getSize();
    //     const location = await button.getLocation();
        
    //     const actions = driver.actions();
    //     await actions.mouseMove({
    //         x: location.x + size.width / 2, 
    //         y: location.y + size.height / 2,
    //     }).click().perform();
        
    //     const text = await container.getText();
    //     expect(text).toBe("clicked");
    // });
});
