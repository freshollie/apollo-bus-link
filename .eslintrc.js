module.exports = {
  plugins: ["jest"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      { allowConstantLoopConditions: true },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["test/**/*.{ts,tsx}"],
      },
    ],
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "default-case": "off",
  },
  parserOptions: {
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  overrides: [
    {
      files: ["test/**/*.{ts,tsx}"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-constant-condition": "off",
        "no-empty": "off",
        "no-await-in-loop": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        // Fix to /// imports in .d.ts
        "spaced-comment": ["error", "always", { markers: ["/"] }],
        "@typescript-eslint/no-unused-vars": "off",
        "functional/no-class": "off",
        "no-shadow": "off",
      },
    },
  ],
};
