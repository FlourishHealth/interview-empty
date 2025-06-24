// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const fernsConfig = require("eslint-plugin-ferns");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      ferns: require("eslint-plugin-ferns"),
      import: require("eslint-plugin-import"),
      prettier: require("eslint-plugin-prettier"),
      lodash: require("eslint-plugin-lodash"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
      "unused-imports": require("eslint-plugin-unused-imports"),
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "react-native": require("eslint-plugin-react-native"),
      "react-perf": require("eslint-plugin-react-perf"),
      "comment-length": require("eslint-plugin-comment-length"),
    },
    settings: {
      react: {
        version: "18.2.0",
      },
    },
    rules: {
      ...fernsConfig.configs.recommended.rules,
    },
  },
  {
    ignores: ["dist/*"],
  },
  eslintPluginPrettierRecommended,
]);
