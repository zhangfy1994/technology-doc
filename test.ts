import * as chokidar from "chokidar";

const watcher = chokidar.watch("./test1");

console.log("开始监听test1");

watcher.on("add", (path, status) => {
  console.log("path", path);
  console.log("status", status);
});

watcher.on("change", (path, status) => {
  console.log("change path", path);
  console.log("change status", status);
});
