import Foo from "./foo.js";
import Bar from "./bar.js";
render({
  code: "() => {\n  const hello = \"Hello,\";\n  const bar = <Bar>world!</Bar>;\n  return <Foo>{hello} {bar}</Foo>;\n}",
  imports: ["const {default: Bar} = await import(\"./test/fixtures/callback-as-argument/bar.js\");", "const {default: Foo} = await import(\"./test/fixtures/callback-as-argument/foo.js\");"]
});