### 1. 初始化项目

```js
// 新建一个文件夹
md react-template

// npm init 初始化
npm init -y
```

### 2. 指定 node 版本和包管理工具 pnpm

- 由于好多最新的包对 node 的要求都是 >=14,故项目中需要指定下 node 版本，我们这里使用 volta 工具自动管理项目的 node 版本，volta 会根据项目中指定的 node 版本自动切换 node，很好用而且简单。使用说明可以参考这篇文章 [volta 的使用](https://juejin.cn/post/7102627615172722702)

```js
volta pin node@
```

- 包管理工具我们指定使用 pnpm

```js

```
