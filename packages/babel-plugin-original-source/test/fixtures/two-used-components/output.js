import Foo from "./foo.js";
import Bar from "./bar.js";
render({
  code: "<Foo>Hello, <Bar>world!</Bar></Foo>",
  imports: ["const {default: Foo} = await import(\"./test/fixtures/two-used-components/foo.js\");", "const {default: Bar} = await import(\"./test/fixtures/two-used-components/bar.js\");"]
});