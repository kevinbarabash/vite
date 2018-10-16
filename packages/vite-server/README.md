# vite-server

Used by `jest-environment-vite` to serve source files from a project
under test as well as npm module dependencies.

## Usage

```
import createServer from "vite-server";

const server = createServer({
    port: 3000, // defaults to 3000
    verbose: true, // defaults to false
    cache: {}, // used to cache compiled modules
});
```
