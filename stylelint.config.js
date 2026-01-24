module.exports = {
  // ...略
  overrides: [
    {
      files: ["**/*.{jsx,tsx}"],
      customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
};
