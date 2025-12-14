import { defineConfig } from "eslint-define-config";

export default defineConfig({
  languageOptions: {
    globals: {
      console: "readonly",
      process: "readonly",
      module: "readonly",
      require: "readonly",
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
});
