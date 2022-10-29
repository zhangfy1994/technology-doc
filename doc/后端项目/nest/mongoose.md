### 链接数据库

```js
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    // 异步链接
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: "mongodb://localhost:27017",
          dbName: "nest-app",
          auth: {
            username: "",
            password: "",
          },
          connectTimeoutMS: 2000,
          bufferCommands: false,
          autoIndex: false,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 创建 MongoDB collection(表)

```js
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

//@Schema 装饰器标记一个类作为Schema 定义，它将我们的 User 类映射到 MongoDB 同名复数的集合 User
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  //@Prop 装饰器在文档中定义了一个属性
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### 使用 collection(表)

```js
// Module
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "@/schemas/user";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class LoginModule {}

// Service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '@/schemas/user';

@Injectable()
export class LoginService {
  // 通过InjectModel 注入 User
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  async login(loginDto) {
    const user = await this.userModal.findOne({ name: loginDto.name });
    return user;
  }
}
```
