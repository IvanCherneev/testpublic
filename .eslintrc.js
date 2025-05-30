module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: [2, "always"],
    "space-before-function-paren": ["error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always",
    }],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
    }],
  },
};
