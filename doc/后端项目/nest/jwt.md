### jsonwebtoken

```js
import { HttpStatus, HttpException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JWT } from "@/config";

// 生成token
export function generateToken(payload: string | object | Buffer) {
  // 过期时间 以 秒为单位
  const token = jwt.sign(payload, JWT.secret, { expiresIn: 60 * 60 });
  return token;
}

// 验证token
export function verifyToken(token: string) {
  return new Promise((resolve) => {
    jwt.verify(token, JWT.secret, function (err, decoded) {
      if (err) {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      } else {
        resolve(decoded);
      }
    });
  });
}
```
