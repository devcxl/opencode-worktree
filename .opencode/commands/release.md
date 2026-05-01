---
description: 项目预发布
subtask: true
---

# Release

## 版本号确认

- **格式**：`v` 开头，符合 semver 规范（如 `v1.0.0`）
- 验证版本号合法性，不合法则报错

## 发布流程

### 第一步：版本号判断

1. **判断用户是否输入版本号**
   - **有输入**：使用用户输入的版本号，比较其与 package.json 中的版本号是否一致
     - **不一致**：修改 package.json 中的版本号为用户输入的版本号
     - **一致**：跳过修改步骤
   - **无输入**：使用 package.json 中的版本号

### 第二步：提交变更（如有版本号修改）

若 package.json 有变更：
1. 提交变更：`git add . && git commit -m "chore: bump version to <VERSION>"`
2. 推送：`git push`

### 第三步：构建并检查

1. **构建**：运行 `npm run build`（TypeScript 编译）
2. **检查**：确保 `dist/` 目录存在且包含编译产物

### 第四步：打标签并推送

1. **打标签**：`git tag <VERSION>`
2. **推送标签**：`git push origin <VERSION>`

## 语义化版本参考

- https://semver.org/lang/zh-CN/