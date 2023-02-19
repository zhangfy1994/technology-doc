### node 中读取流

- 在 node 中读取文件的方式有来两种，一个是利用 fs 模块，一个是利用流来读取。如果读取小文件，我们可以使用 fs 读取，fs 读取文件的时候，是将文件一次性读取到本地内存。而如果读取一个大文件，一次性读取会占用大量内存，效率很低，这个时候需要用流来读取。流是将数据分割段，一段一段的读取，可以控制速率,效率很高,不会占用太大的内存。gulp 的 task 任务，文件压缩，和 http 中的请求和响应等功能的实现都是基于流来实现的

```js
import fs from "node:fs";

// 读取流的方法
const rs = fs.createReadStream("./text.npg", {
  // highWaterMark:3, //文件一次读多少字节,默认 64*1024
  // flags:'r', //默认 'r'
  // autoClose:true, //默认读取完毕后自动关闭
  // start:0, //读取文件开始位置
  // end:3, //流是闭合区间 包含start也含end, 默认正无穷
  // encoding:'utf8' //默认null即buffer
});
let n = 0;

rs.on("open", () => {
  console.log("文件打开");
});

// 监听数据流，只有监听了才开始读取流
rs.on("data", (chunk) => {
  n++;
  console.log(chunk.byteLength);
  console.log(Buffer.isBuffer(chunk)); // true

  // 我们可以每次都暂停数据读取，做一些数据中间处理（比如压缩）后再继续读取数据
  rs.pause();

  setTimeout(() => {
    console.log("继续获取....");
    // 继续读取
    rs.resume();
  }, 100);
});

// 数据传递完成后，会触发 'end' 事件
rs.on("end", () => {
  console.log(`传输结束，共收到 ${n} 个 Buffer 块`);
});
// 整个流传输结束关闭的时候会触发 close
rs.on("close", () => {
  console.log("传输关闭");
});
// 异常中断或者出错时的回调处理
rs.on("error", (e) => {
  console.log("传输出错" + e);
});
```

### node 中写入流

```js
import fs from "node:fs";

const rs = fs.createReadStream("./test.png");
const ws = fs.createWriteStream("./test2.png");

rs.on("data", (chunk) => {
  // true表示可以继续写入,如果返回false，表示缓存区满了,我们应当停止读取数据以避免消耗过多内存
  if (ws.write(chunk) === false) {
    console.log("still cached");
    rs.pause();
  }
});
rs.on("end", () => {
  // 当没有数据再消耗后，关闭数据流
  ws.end();
});

// 缓存区满后，文件写入一直在进行，不一会儿会把缓存区的内容全部写入，缓存区处于清空状态，这时会触发可写流的‘drain’事件
ws.on("drain", () => {
  console.log("数据被消耗后，继续启动读数据");
  rs.resume();
});
```

### 管道

- 无论是哪一种流，都会使用 pipe() 方法来实现输入和输出，pipe 的左边是是流，右边也是流，左边读出的数据，经过 pipe 输送给右边的目标流，目标流经过处理后，可以继续往下不断的 pipe，从而形成一个 pipe 链条，小水管就全部串起来了。pipe 会自动监听 data 和 end 事件，文件中的每一小段数据都会源源不断的发送给客户端，pipe 方法 还可以自动控制后端压力，在客户端连接缓慢的时候 Node 可以将尽可能少的缓存放到内存中，通过对内存空间的调度，就能自动控制流量从而避免目标被快速读取的可读流所淹没，并且，数据在 pipe 的时候，只有 pipe 链末端的目标流真正需要数据的时候，数据才会从源头被取出来，然后顺着管子一路走下去，属于被动消费，那么整体表现就会更优异一些

```js
// 例子1
fs.createReadStream("./test.png").pipe(fs.createWriteStream("./test2.png"));

// 例子2
const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHeader(200, { "Context-Type": "text/html" });
    fs.createReadStream("./big.txt").pipe(res);
  })
  .listen(5000);
```
