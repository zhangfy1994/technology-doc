### 读取文件

- readFile 读取文件全部内容，如果文件不存在则报错
- fs.read 方法可以更精确的读取文件

```js
import { readFile } from "node:fs/promises";

// 默认读取格式是buffer
readFile("./test.json", "utf-8").then((res) => {
  console.log("res>>>", JSON.parse(res));
});
```

### 写入文件

- writeFile 如果文件不存在会创建一个文件，这种写入方式会全部删除旧有的数据，然后再写入数据
- appendFile 往文件中添加数据
- fs.write 方法可以更精确写入内容

```js
import { writeFile, appendFile } from "node:fs/promises";

const obj = { a: 1, b: 2 };
writeFile("./test.json", JSON.stringify(obj, null, 2)).then((res) => {
  console.log("res2", res); // undefined
});

appendFile("./test.txt", "\n我是zfy").then((res) => {
  console.log("res", res); // undefined
});
```

### 拷贝文件

- fsPromises.copyFile(src, dest[, mode])

```js
import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 入参是文件名，或 带路径的文件名
copyFile("test.txt", path.resolve(__dirname, "../test2.txt")).then((res) => {
  console.log("res", res); // undefined
});
```

### 删除文件

- fsPromises.rm(path[, options])

```js
// 默认只能删除文件类型, 添加第二个参数options = { force: true, recursive: true }, 可以删除任何类型类似 rm -rf
import { rm } from "node:fs/promises";

rm("./test.txt", { force: true, recursive: true }).then((res) => {
  console.log("res", res);
});
```

### 创建文件夹

- fsPromises.mkdir(path[, options])

```js
import { mkdir } from "node:fs/promises";

mkdir(path.resolve(__dirname, "../test")).then((res) => {
  console.log("res", res);
});
```

### 读取文件夹

- fsPromises.readdir(path[, options]) defaultOptions = {encoding: 'utf8', withFileTypes: false}

```js
import { readdir } from "node:fs/promises";

const dirPath = path.resolve(__dirname, "../test");
readdir(dirPath).then((files) => {
  for (const file of files) {
    console.log(file); //如果file是文件 file = xx.xx， 如果file是文件夹 file = 文件夹名
  }
});
```

### 拷贝文件或文件夹里面内容（只会拷贝内容）, 路径不存在时会自动创建

- fsPromises.cp(src, dest[, options]) node v16.17 才支持

```js
import { cp } from "node:fs/promises";

// 默认只拷贝文件，添加 recursive: true 可拷贝文件夹
cp(path.resolve(__dirname), path.resolve(__dirname, "../test2"), {
  force: true, // 如果test2存在则强制覆盖
  recursive: true, // 递归文件夹拷贝，如果为false，里面有文件夹则报错
});
```

### 获取文件或文件夹信息

- fsPromises.stat(path[, options])

```js
import { stat } from "node:fs/promises";

stat("./test.js").then((res) => {
  // res.isFile() 判断是否是文件
  // res.isDirectory() 判断是否是文件夹
  // 还有其他属性
  console.log(file, res.isFile()); // true
});
```

### 判断文件或文件夹是否存在、文件是否有权限

- fsPromises.access(path[, mode])#

```js
import { access, constants } from "node:fs/promises";

// 判断文件夹是否存在，要加catch 或 try catch ,不然程序会挂掉
// constants.R_OK 读的权限、 constants.W_OK 写的权限、 constants.X_OK 执行的权限 、 constants.F_OK 文件是否正常
access("./test", constants.F_OK)
  .then(() => {
    console.log("exit");
  })
  .catch(() => {
    console.log("not");
  });
```
