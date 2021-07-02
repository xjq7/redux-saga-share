module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    g: "writeable",
    module: "readonly"
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 7,
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
    "no-inner-declarations": 1
  },
}
