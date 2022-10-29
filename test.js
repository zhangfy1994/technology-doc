"use strict";
exports.__esModule = true;
var chokidar = require("chokidar");
var watcher = chokidar.watch("./test1");
console.log("开始监听test1");
watcher.on("add", function (path, status) {
    console.log("path", path);
    console.log("status", status);
});
watcher.on("change", function (path, status) {
    console.log("change path", path);
    console.log("change status", status);
});
