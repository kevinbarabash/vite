// https://github.com/gajus/eslint-plugin-flowtype
// https://flowtype.org/
module.exports = {
    rules: {
        "flowtype/boolean-style": ["error", "boolean"],
        "flowtype/define-flow-type": "warn", // suppress no-undef on flow types
        "flowtype/no-dupe-keys": "error",
        "flowtype/no-types-missing-file-annotation": "error",
        "flowtype/no-weak-types": "off",    // allow 'any' for now
        // flow may still require parameter types in certain situations
        "flowtype/require-parameter-type": "off",
        "flowtype/require-return-type": "off",
        "flowtype/require-valid-file-annotation": [
            2,
            "always", {
                "annotationStyle": "line",
            },
        ],
        "flowtype/sort": "off",
        "flowtype/type-id-match": "off",
        "flowtype/use-flow-type": "warn",  // suppress no-unused-vars on flow types
    },
    settings: {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true,
        }
    },
    extends: [
        "prettier/flowtype",
    ],
    plugins: [
        "flowtype",
    ],
}
