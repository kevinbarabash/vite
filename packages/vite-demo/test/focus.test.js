/* global By */
// @flow
describe("focus handling", () => {
    test("pressing tab should switch focus", async () => {     
        await render(<div>
            <button>foo</button>
            <button>bar</button>
        </div>);

        const TAB = "\ue004";

        let element;
        let text;

        await driver.actions().sendKeys(TAB).perform();
        element = await driver.switchTo().activeElement();
        text = await element.getText();
        expect(text).toBe("foo");

        await driver.actions().sendKeys(TAB).perform();
        element = await driver.switchTo().activeElement();
        text = await element.getText();
        expect(text).toBe("bar");

        // tabbing again makes the body active
        await driver.actions().sendKeys(TAB).perform();
        element = await driver.switchTo().activeElement();
        expect(await element.getTagName()).toBe("body");

        // tabbing again selects the first item
        await driver.actions().sendKeys(TAB).perform();
        element = await driver.switchTo().activeElement();
        text = await element.getText();
        expect(text).toBe("foo");
    });

    test("programmatic changing focus", async () => {
        await render(<div>
            <button id="foo">foo</button>
            <button id="bar">bar</button>
        </div>);

        const focus = async (element) => 
            await driver.executeScript((element) => {
                element.focus();
            }, element);

        const blur = async (element) => 
            await driver.executeScript((element) => {
                element.blur();
            }, element);

        const foo = await driver.findElement(By.id("foo"));
        const bar = await driver.findElement(By.id("bar"));

        let element;

        await focus(foo);
        element = await driver.switchTo().activeElement();
        expect(await element.getText()).toBe("foo");

        await blur(foo);
        element = await driver.switchTo().activeElement();
        expect(await element.getTagName()).toBe("body");

        await focus(bar);
        element = await driver.switchTo().activeElement();
        expect(await element.getText()).toBe("bar");
    });
});

