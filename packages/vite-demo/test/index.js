import Foo from "../src/foo.js";
import Bar from "../src/bar.js";

import {render, cleanup} from "../util/util.js";

describe("selenium tests", () => {
    test("the title should be 'Hello, world!'", async () => {     
        await driver.get("http://localhost:3000/");
        const result = await render(<Foo>Hello, world!</Foo>);
        const text = await result.getText();
        expect(text).toBe("Hello, world!");
        cleanup(result);
    });

    test("it should work arrow expressions", async () => {
        await driver.get("http://localhost:3000/");
        const result = await render(() => {
            const msg = "Hello, world!";
            return <Foo>{msg}</Foo>;
        });
        const text = await result.getText();
        expect(text).toBe("Hello, world!");
        cleanup(result);
    });

    test("it should handle components that import other components", async () => {
        await driver.get("http://localhost:3000/");
        const result = await render(<Bar/>);
        const text = await result.getText();
        expect(text).toBe("Hello, world!");
        cleanup(result);
    });
});
