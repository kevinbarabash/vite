import Foo from "./foo.js";
render({
  code: "<Foo bar=\"bar\">Hello, world!</Foo>",
  imports: ["const {default: Foo} = await import(\"./test/fixtures/jsx-attribute/foo.js\");"]
});