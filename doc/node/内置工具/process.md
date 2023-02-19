### process

```js
import process from "node:process";

process.cwd(); // 获取当前文件执行工作目录

process.version; // node 版本

process.platform; // 系统平台 支持的系统平台包括：'aix' 'darwin' 'freebsd' 'linux' 'openbsd' 'sunos' 'win32'

process.arch; // cpu 架构 支持的值包括：'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32' 'x64'

process.env.NODE_ENV; // node 环境

process.argv; // 启动参数, 第三项开始是传递的参数

process.setUncaughtExceptionCaptureCallback(fn); // 捕获异常，当process.setUncaughtExceptionCaptureCallback(fn)指定了监听函数的时候，uncaughtException事件将会不再被触发。

process.exit(0 | 1); // 手动退出进程，0 是正常退出，1 是有问题退出
```
