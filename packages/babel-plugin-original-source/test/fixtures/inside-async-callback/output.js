import Foo from "./foo.js";

const foo = async () => {
  render({
    code: "<Foo>Hello, world!</Foo>",
    imports: ["const {default: Foo} = await import(\"./foo.js\");"]
  });
};