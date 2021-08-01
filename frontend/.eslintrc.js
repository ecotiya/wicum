module.exports = {
  env: {
    browser: true,  // ブラウザで実行されるコードを性的検証する。
    es2020: true,
    node: true  // module.exportsはnode.jsの書き方のため、envに追加しないとeslintに引っかかる。
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // TypeScriptでチェックされる項目をLintから除外する設定
    "prettier" // prettierのextendsは他のextendsより後に記述する
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    project: "./tsconfig.json" // TypeScriptのLint時に参照するconfigファイルを指定
  },
  root: true, // 上位ディレクトリにある他のeslintrcを参照しないようにする
  rules: {}
}
