import Foo from "./foo.js";
import Bar from "./bar.js";
render(() => {
    const hello = "Hello,";
    const bar = <Bar>world!</Bar>;
    return <Foo>{hello} {bar}</Foo>;
});