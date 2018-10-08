import Foo from "./foo.js";
import Bar from "./bar.js";
render({
  code: "<Foo>Hello, <Bar>world!</Bar></Foo>",
  imports: ["const {default: Foo} = await import(\"./foo.js\");", "const {default: Bar} = await import(\"./bar.js\");"]
});