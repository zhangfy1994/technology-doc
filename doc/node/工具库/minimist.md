### minimist 使用

```js
import minimist from "minimist";

const argv = minimist(process.argv.splice(2));

// 参数后面没值，默认参数值是 true
node test.js -a --b // argv { _: [], a: true, b: true }

// 参数后面有值会变成key: value, 单独值会放到_ 数组里面
node test.js -a=1 --b d c 3 // argv { _: ['c', 3], a: 1, b: 'd' }
```

```js
import minimist from "minimist";

// string 参数是将对应参数的value 固定为 string 类型
const argv = minimist(process.argv.splice(2), {string: ['a']});

node test.js -a=1 // argv { _: [], a: '1' }

node test.js -a // argv { _: [], a: '' }
```

```js
import minimist from "minimist";

// boolean 为true时， 只固定 --参数 的value值为true, (--参数=value除外)
const argv = minimist(process.argv.splice(2), {boolean: true});

node test.js --a 1 -b 2 --c=3 // argv { _: [1], a: true, b: 2, c: 3 }


// boolean ['参数'] ， 将参数值固定为true, --参数 和 -参数 都适用
const argv = minimist(process.argv.splice(2), {boolean: ['a']});

node test.js -a 1 -b 2 c d // argv { _: [1, 'c', 'd'], a: true, b: 2 }
```

```js
import minimist from "minimist";

// alias配置别名
const argv = minimist(process.argv.splice(2), {
  alias: {
    version: ["v", "V"],
  },
});

node test.js -v 1 // argv { _: [], v: 1, version: 1, V: 1 }
```
