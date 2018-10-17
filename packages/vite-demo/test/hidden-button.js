// @flow
import HiddenButton from "../src/hidden-button.js";

describe("HiddenButton", () => {
    test("it should render", async () => {     
        const element = await render(<HiddenButton/>);
        const text = await element.getText();
        expect(text).toBe("Click me!");
    });
});
