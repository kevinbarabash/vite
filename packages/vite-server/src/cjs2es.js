const rollup = require('rollup');

const commonjsPlugin = require('rollup-plugin-commonjs');
const resolvePlugin = require('rollup-plugin-node-resolve');
const autoExternalPlugin = require('rollup-plugin-auto-external');

const resolveModule = require('resolve');

async function resolvePkg(moduleName, options) {
    return new Promise((resolve, reject) => {
        resolveModule(moduleName, options, (err, res, pkg) => {
            if (err) {
                reject(err);
            } else {
                resolve({res, pkg});
            }
        });
    });
}

async function build(moduleName) {
    const basedir = process.cwd();
    const {res, pkg} = await resolvePkg(moduleName, {basedir: basedir});
    const input = res;

    const inputOptions = {
        input,
        plugins: [
            autoExternalPlugin(),
            resolvePlugin({
                module: true,
                jsnext: true,
                main: true,
                browser: true,
            }),
            commonjsPlugin(pkg.module ? {} : {
                namedExports: {
                    [input]: Object.keys(require(input)).filter(key => key !== "default"),
                },
            }),
        ],
    };

    const outputOptions = {
        format: 'es',
    };

    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    let {code} = await bundle.generate(outputOptions);

    // TODO: use built-in plugin
    code = code
        .replace(/process\.env\.NODE_ENV/g, '"production"');

    // rename imports to have an absolute path
    // note: rollup generates 'import Foo from "foo"' statements instead of 
    // 'import * as Foo from "foo"'.
    return code.replace(/\s+from\s+['"]([^'"]+)['"]/g, 
        (match, path) => ` from "/node_modules/${path}.js"`);
}

module.exports = build;
