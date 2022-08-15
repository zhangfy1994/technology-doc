1.  先通读一遍官方[升级指南](https://webpack.docschina.org/migrate/5/)
1.  将 `webpack` `webpack-cli` 及 使用到的`loader` `plugin` 升到最新版本 ， node 版本也要升级到 >= 14.18.0，因为最新包对 node 版本有要求。

```javascript
npm i webpack@latest webpack-cli@latest webpack-dev-server@latest -D

// loader plugin 自行升级
```

3. 执行`npm run start`（根据自己项目配置的命令），打开本地开发环境，不出意外这时肯定报错了 😄，我的是这样的:![error1.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660543319444-c2b1fdab-8ace-4eb1-af21-8329d32a8601.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u63e4ad5a&margin=%5Bobject%20Object%5D&name=error1.png&originHeight=1324&originWidth=3820&originalType=binary&ratio=1&rotation=0&showTitle=false&size=454043&status=done&style=none&taskId=ucf9275a2-4fc6-49da-8331-111ef884573&title=)

这说明你以前的配置**devtool**项现在 webpack5 不支持了，所以去查看最新支持选项改下就行。
**注**：如果报错 log 信息太多，在 vscode 里面可能看不全，可以通过**pwd **命令获取项目所在目录，然后在电脑新开一个终端去执行 npm run start 命令调试

4. 在 dev 环境添加永久缓存

```javascript
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename] // 当你的 CLI 自动添加它时你可以省略它
    }
  },
```

5. 接下来是 output 选项：主要是这两个属性![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ0Mzk5ODczXzVGQjg4NDM1LUQyQzItNDk0MC1CMDE2LUY4QjBGRTJFMUIxQS5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660545444300-d497fc3d-f356-4bb3-bf3b-f4c65141a399.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u5db23ba0&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ0Mzk5ODczXzVGQjg4NDM1LUQyQzItNDk0MC1CMDE2LUY4QjBGRTJFMUIxQS5wbmc%3D.png&originHeight=708&originWidth=1230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=118532&status=done&style=none&taskId=u2cdc00b4-ee4f-4a78-bff3-9cabc1d322f&title=)

jsonpFunction 直接去掉就行，因为 Webpack 5 确实会从 package.json name 中自动推断出一个唯一的构建名称，并将其作为 output.uniqueName 的默认值.

```javascript
libraryTarget: "umd";

// 改成下面
library: {
  type: "umd";
}
```

5. loader 修改，因为安装最新的 loader 版本，所以有些配置项不支持了，根据 webpack 提示一一修改就好。

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ3MTU2NDUxX0UwREYyNDA5LUNGOEQtNDBCMy1CRDQ2LUM1QTlDMkMzMTA1NC5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660547176231-6d7cf090-fde0-4fc1-91b3-b092cd966f8c.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u2461a252&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ3MTU2NDUxX0UwREYyNDA5LUNGOEQtNDBCMy1CRDQ2LUM1QTlDMkMzMTA1NC5wbmc%3D.png&originHeight=1594&originWidth=1742&originalType=binary&ratio=1&rotation=0&showTitle=false&size=253229&status=done&style=none&taskId=u4398aada-2104-499d-8a09-651cb26372f&title=)

```javascript
rules: [
  {
    // 过滤掉 .d.ts声明文件
    test: [/.*\.d\.ts/],
    loader: "ignore-loader",
  },
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: [/.*\.d\.ts/, /\node_modules/],
    loader: require.resolve("babel-loader"),
    options: {
      cacheDirectory: true,
      cacheCompression: false,
      // configFile是指定babelrc配置的路径，默认是项目根目录
      configFile: path.resolve(__dirname, "../../../.babelrc"),
    },
  },
  {
    test: /\.html$/,
    loader: "html-loader",
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.(png|gif|jpg|jpeg)$/,
    loader: "file-loader",
    // 添加type,避免webpack多次处理
    type: "javascript/auto",
  },
  {
    test: /\.(ttf|woff|svg|eot)$/,
    loader: "file-loader",
    type: "javascript/auto",
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
    ],
  },
];
```

6. plugin 修改，方式同 loader

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ3NDk4MDk2X0E2MzcyRkFFLTUyRUUtNEZCNC04NEZELUY1ODAxN0VENDUwMy5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660547569658-456109cb-72df-4fe4-887b-fc7ce5789c09.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u737327fc&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ3NDk4MDk2X0E2MzcyRkFFLTUyRUUtNEZCNC04NEZELUY1ODAxN0VENDUwMy5wbmc%3D.png&originHeight=1994&originWidth=2216&originalType=binary&ratio=1&rotation=0&showTitle=false&size=365081&status=done&style=none&taskId=u0d8ee5ee-00d0-4aa8-b69b-9fe060f3fa5&title=)

```javascript
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
    // webpack.ProvidePlugin使用参考下面链接
    // https://webpack.docschina.org/plugins/provide-plugin/#root
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../i18n'),
          to: path.resolve(__dirname, '../dist/i18n')
        }
      ]
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin()],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
```

7. 如果使用 express 劫持 webpack-dev-middleware 的话需要修改

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ4Njk3NjM1X0FCMzk2RTk1LUZGMTEtNDdCMi1BMDFBLTgzMDQ2RDk5QURGMC5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660548849337-7d4052f0-ad8e-4a2c-8dd3-847e1f2d5e90.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u786c9edd&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ4Njk3NjM1X0FCMzk2RTk1LUZGMTEtNDdCMi1BMDFBLTgzMDQ2RDk5QURGMC5wbmc%3D.png&originHeight=1964&originWidth=2304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=427141&status=done&style=none&taskId=ua0854877-c8b9-4a90-a841-43afd2bbb33&title=)

8. webpack 5 不再自动 polyfill Node.js 的核心模块,如果项目中或第三方包有使用到 node 模块，需要我们手动去安装 polyfill，然后有两种方式去向 webpack 提供 polyfill

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ5ODU1MDM3XzkxMjlCQUExLURBODYtNDdGQy05NzY0LUM2MTI4OTA0QkJDOS5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660549914954-72f33a5b-58ff-4f19-bd2a-4cd8d0982088.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=udd3ce7d4&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ5ODU1MDM3XzkxMjlCQUExLURBODYtNDdGQy05NzY0LUM2MTI4OTA0QkJDOS5wbmc%3D.png&originHeight=1392&originWidth=1826&originalType=binary&ratio=1&rotation=0&showTitle=false&size=259634&status=done&style=none&taskId=u723aac85-2c45-4bde-81a0-ed41c76ecd8&title=)
![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ5ODc5MjUwXzdCNzAxNkYzLUNGOUEtNDk0Qy1CN0FELUQzRjU2MkU1M0YxRS5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660549954639-4a9dfc56-8fb3-4bec-b029-1cbb6a9e913d.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=ue42014d2&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTQ5ODc5MjUwXzdCNzAxNkYzLUNGOUEtNDk0Qy1CN0FELUQzRjU2MkU1M0YxRS5wbmc%3D.png&originHeight=532&originWidth=1816&originalType=binary&ratio=1&rotation=0&showTitle=false&size=104784&status=done&style=none&taskId=u1a4a02ba-33e7-4d64-9e33-c25f0c44595&title=)
[fallback 使用文档](https://webpack.docschina.org/configuration/resolve/#resolvefallback)  
 [provide-plugin 使用文档](https://webpack.docschina.org/plugins/provide-plugin/#root)

9. 建议在项目目录 package.json 里添加 browserslist, 这样可以让 webpack 和 babel 根据平台支持去编译代码

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUwMTkxMzEzX0FDMzk1RTg4LTg5M0YtNEI3NS1CRkJBLTgzMEVBRTI1RTJGMi5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660550626372-dd082e58-18f0-46cf-be62-7db561f26312.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=ua8506a75&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUwMTkxMzEzX0FDMzk1RTg4LTg5M0YtNEI3NS1CRkJBLTgzMEVBRTI1RTJGMi5wbmc%3D.png&originHeight=1224&originWidth=2924&originalType=binary&ratio=1&rotation=0&showTitle=false&size=322082&status=done&style=none&taskId=ue00ce416-9bfa-4f29-b704-d048c7cb481&title=)

10. 因为最新 plugin 包， 如 CopyWebpackPlugin 对 node 版本有要求，要>=14，而我们构建平台只有 15 的版本，故需要在 yml 文件中指定下 node 版本

![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUwOTg0ODExXzYyRDQ5MUVGLTI3ODEtNDIxMi04RDhGLTA0QzJEQzY2MTNDNS5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660551027131-c9197971-5640-4745-a715-85bcc6e28517.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u2e75f312&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUwOTg0ODExXzYyRDQ5MUVGLTI3ODEtNDIxMi04RDhGLTA0QzJEQzY2MTNDNS5wbmc%3D.png&originHeight=1506&originWidth=3082&originalType=binary&ratio=1&rotation=0&showTitle=false&size=360291&status=done&style=none&taskId=u1ace7e39-a623-4730-85d2-305231e58cc&title=)
![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUxMDEwMTAwXzYxQkJGQTk4LUUzQjYtNEIwQS1CNEZELTQyNzQzREZCNDQ0OC5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660551038967-fb547546-f362-4458-9a8a-4fdbe4ffd04e.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=uc070da22&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUxMDEwMTAwXzYxQkJGQTk4LUUzQjYtNEIwQS1CNEZELTQyNzQzREZCNDQ0OC5wbmc%3D.png&originHeight=1488&originWidth=2640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=283050&status=done&style=none&taskId=ube9cd925-0e5f-4278-9910-13a6293702c&title=)
还有 node 15 版本 对应的是 npm 7, 而 npm6 和 npm7 对 peerDependencies 依赖安装处理冲突的方式不同， 在构建系统会报错，故需要在 installl 时指定 --legacy-peer-deps, 它告诉 NPM 忽略项目中引入的各个**modules**之间的相同**modules**但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本**modules**共存。
![L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUxNTk4OTA2XzhGRkZGNkNCLUE0MjItNEU4Ni04OTc2LTgxNkQ5MDE2NzYyNi5wbmc=.png](https://cdn.nlark.com/yuque/0/2022/png/21485166/1660551726937-70ea2b86-ac02-4ad9-b1d3-aab789781c36.png#clientId=ub5020688-45dd-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u3bfb6b13&margin=%5Bobject%20Object%5D&name=L1VzZXJzL3poYW5nZnV5aW5nL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9EaW5nVGFsa01hYy8yODI1NDcxNjFfdjIvSW1hZ2VGaWxlcy8xNjYwNTUxNTk4OTA2XzhGRkZGNkNCLUE0MjItNEU4Ni04OTc2LTgxNkQ5MDE2NzYyNi5wbmc%3D.png&originHeight=1856&originWidth=3600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1010855&status=done&style=none&taskId=u816a5a54-2d82-4882-9d79-3df82736525&title=)
[--legacy-peer-deps 说明](https://juejin.cn/post/6971268824288985118)
