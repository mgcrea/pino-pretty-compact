// @ts-check

/**
 * Prettier configuration
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  printWidth: 110,
  plugins: ["prettier-plugin-organize-imports"],
  organizeImportsSkipDestructiveCodeActions: false,
};
