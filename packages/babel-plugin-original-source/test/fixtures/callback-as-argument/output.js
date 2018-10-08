import Foo from "./foo.js";
import Bar from "./bar.js";
render({
  code: "() => {\n  const hello = \"Hello,\";\n  const bar = <Bar>world!</Bar>;\n  return <Foo>{hello} {bar}</Foo>;\n}",
  imports: ["const {default: Bar} = await import(\"./bar.js\");", "const {default: Foo} = await import(\"./foo.js\");"]
});