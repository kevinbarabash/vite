import Foo from "./foo.js";
import Bar from "./bar.js";
render({
  code: "<Foo>Hello, world!</Foo>",
  imports: ["const {default: Foo} = await import(\"./test/fixtures/used-and-unused-components/foo.js\");"]
});