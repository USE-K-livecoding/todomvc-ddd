module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [
        {
            files: [ "*.ts", "*.tsx" ],
            rules: {
                "no-dupe-class-members": "off",
            },
        },
    ],
    plugins: [
        "@typescript-eslint",
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    settings: {
        react: {
            version: "detect",
        }
    },
};
