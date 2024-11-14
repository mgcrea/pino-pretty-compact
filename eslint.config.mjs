// @ts-check
import baseConfig from "@mgcrea/eslint-config-node";

/**
 * Eslint configuration
 * @see https://jestjs.io/docs/configuration
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...baseConfig,
  {
    rules: {
      "no-console": "warn",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  },
];
