## babel 的配置

```js
pnpm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/preset-typescript
pnpm install --save  @babel/runtime-corejs3

// babel配置文件
{
  "presets": [
    [
      '@babel/typescript',
      "@babel/preset-env"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 3
      }
    ]
  ]
}

```
