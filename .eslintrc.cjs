module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended", // 使用 ESLint 推荐的规则
    "plugin:@typescript-eslint/recommended", // 使用 TypeScript ESLint 推荐的规则
    "plugin:react-hooks/recommended", // 使用 React Hooks ESLint 推荐的规则
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"], // 忽略检查的文件或文件夹
  parser: "@typescript-eslint/parser", // 使用 TypeScript ESLint 解析器
  plugins: ["react-refresh"], // 使用 React Refresh 插件
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // 关闭禁止使用 any 类型的规则
    "no-extra-boolean-cast": "off", // 关闭禁止不必要的布尔类型转换的规则
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ], // 设置 React Refresh 插件的规则
  },
};
