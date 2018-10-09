import Foo from "../src/foo.js";
import Bar from "../src/bar.js";

import {render, cleanup} from "../util/util.js";

describe("selenium tests", () => {
    beforeEach(async () => {
        await driver.get("http://localhost:3000/");
    });

    test("the title should be 'Hello, world!'", async () => {     
        const element = await render(<Foo>Hello, world!</Foo>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
        cleanup(element);
    });

    test("it should work arrow expressions", async () => {
        const element = await render(() => {
            const msg = "Hello, world!";
            return <Foo>{msg}</Foo>;
        });
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
        cleanup(element);
    });

    test("it should handle components that import other components", async () => {
        const element = await render(<Bar/>);
        const text = await element.getText();
        expect(text).toBe("Hello, world!");
        cleanup(element);
    });
});
