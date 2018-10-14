// These are rules that are shared by all our javascript, no matter
// where it is written (in webapp javascript files, inside html
// <script> tags, in node.js scripts).
//
// In particular, there are NO ES6 OR ES7 rules here, since browsers
// do not support them yet.  Look in `eslintrc` for those rules instead.
//
// This rc file is not meant to be used directly; rather it is extended
// by the user-facing files eslintrc, eslintrc.browser, and eslintrc.node.
module.exports = {
    rules: {
        // We'd possibly like to remove the 'properties': 'never' one day.
        "camelcase": ["error", {"properties": "never"}],
        "curly": "error",
        "eqeqeq": ["error", "allow-null"],
        "guard-for-in": "error",
        "linebreak-style": ["error", "unix"],
        "max-lines": ["error", 1000],
        "no-alert": "error",
        "no-array-constructor": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-extra-bind": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-throw-literal": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unused-expressions": ["error", {"allowShortCircuit": true, "allowTernary": true}],
        "no-unused-vars": ["error", {"args": "none", "varsIgnorePattern": "^_*$"}],
        "no-useless-call": "error",
        "no-with": "error",
        "one-var": ["error", "never"],
        "jsx-a11y/alt-text": "error",
        "jsx-a11y/aria-props": "error",
        "jsx-a11y/anchor-is-valid": "error",
        // TODO(scottgrant): Add additional a11y rules as we support them.
        // ---------------------------------------
        // Stuff that's disabled for now, but maybe shouldn't be.
        // TODO(jeresig): It's an anti-pattern but it appears to be used
        // frequently in reducers, the alternative would be super-clunky.
        "no-case-declarations": "off",
        // TODO(csilvers): enable these if/when community agrees on it.
        // Might be nice to turn this on one day, but since we don't
        // use jsdoc anywhere it seems silly to require it yet.
        "valid-jsdoc": "off",
        "require-jsdoc": "off",
    },
    plugins: [
        "jsx-a11y",
        "prettier"
    ],
    extends: [
        "eslint:recommended",
        "prettier"
    ]
}
