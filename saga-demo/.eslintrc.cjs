module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    module: "readonly"
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  plugins: [],
  rules: {
    "no-unused-vars": 1,
    "quotes": ["error", "double"],
    "no-undef": 2,
    "no-constant-condition": 1,
    "no-dupe-args": 2,
    "no-dupe-else-if": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-semi": 2,
    "no-func-assign": 1,
    "no-inner-declarations": 1,
    "prefer-rest-params": 2,
    "default-param-last": 1,
    "no-param-reassign": 1,
    "function-paren-newline": [2, { minItems: 6 }],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "arrow-body-style": [2, "as-needed"],
    "no-duplicate-imports": 2,
    "generator-star-spacing": [2, { before: false, after: true }],
    "eqeqeq": [2, "smart"],
    "no-unneeded-ternary": 2,
    "no-mixed-operators": 2,
    "nonblock-statement-body-position": 2
  },
}
