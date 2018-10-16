// https://github.com/yannickcr/eslint-plugin-react
// https://facebook.github.io/react/
module.exports = {
    rules: {
        "react/forbid-prop-types": ["error", { "forbid": [ "array", "object" ] }],
        "react/jsx-handler-names": "error",
        "react/jsx-no-duplicate-props": "error",
        // This triggers a ton on stuff like 'if (window.x) { x(...) }'.
        "react/jsx-no-undef": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/no-did-mount-set-state": ["error"],
        "react/no-did-update-set-state": "error",
        "react/no-direct-mutation-state": "error",
        "react/prop-types": "error",
        "react/self-closing-comp": "error",
        "react/sort-comp": ["error", {
            // TODO(kevinb): specify where "constructor" should go
            "order": [
                "type-annotations",
                "static-methods",
                "lifecycle",
                "everything-else",
                "render"
            ]
        }],
        // TODO(riley): Introduce this rule once we upgrade to >= 2.0.0.
        // "template-curly-spacing": "error",
        // ---------------------------------------
        // ES6/jsx stuff we explicitly disable.
        // We turned this off since it was too much work for too
        // little benefit, especially for one-line props.
        "react/jsx-sort-props": "off",
        // We turned this off too as we didn't see an explicit benefit
        "react/sort-prop-types": "off",
    },
    extends: [
        "prettier/react"
    ],
    plugins: [
        "react"
    ]
};
