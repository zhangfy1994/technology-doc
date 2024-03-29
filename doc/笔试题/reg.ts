/*
.   匹配任何字符
\w  字母、数字和下划线
\W  匹配任意除字母、数字、下划线和汉字之外的字符
\d  匹配数字
\D  匹配非数字
\s  匹配任何空白字符
\S  匹配非空白字符
[]  代表字符集,会匹配当中的任意一个。例如[a-z]会匹配小写字母。
[^]  否定字符集。例如[^a-z]会匹配非小写字母。
{n,m} 表示最少重复n次,最多重复m次， {n,} 表示至少重复n次。
(?=)  正先行断言，表示后面的正则表达式必须匹配成功。如 /a(?=b)/ 表示a后面必须包含b。
(?<=)  正后发断言，表示前面的正则表达式必须匹配成功。如 /(?<=c)d/ 表示d前面必须包含c。
(?!)  负先行断言，表示后面的正则表达式必须匹配失败。如 /d(?!e)/ 表示d后面必须不包含e。
(?<!)  负后发断言,表示前面的正则表达式必须匹配失败。如 /(?<!g)f/ 表示f前面必须不包含g。
*/

// 千分位
const reg1 = /\B(?=(\d{3})+$)/g;
console.log("1234564444".replace(reg1, ",")); // 123,456,4444

// 邮箱
const reg2 = /^[\w|-]+@[\w|-]+\.[\w|-]+$/;
console.log("gaozihang-001@gmail.com".match(reg2)); // true

// url
const reg3 = /^http(s?):\/\/[a-zA-Z0-9]+\.[a-zA-Z]{2,6}/;
console.log(reg3.test("https://www.baidu.com")); // true

// 最少8位，大写 小写 数字 特殊符号
const reg =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}/;
console.log(reg.test("12aakkkkd6@A"));
