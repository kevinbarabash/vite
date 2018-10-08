const originalSourcePlugin = require("babel-plugin-original-source");

module.exports = {
    "presets": ["@babel/react"],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-syntax-dynamic-import",
        originalSourcePlugin,
    ],
};
