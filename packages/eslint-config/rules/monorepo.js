// https://github.com/azz/eslint-plugin-monorepo
module.exports = {
    plugins: [
        "monorepo"
    ],
    rules: {
        "monorepo/no-internal-import": "error",
        "monorepo/no-relative-import": "error",
    },
};
