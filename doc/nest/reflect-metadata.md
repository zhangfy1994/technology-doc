### nest 的依赖注入（控制反转）

- 不需要手动创建实例，框架会自动扫描需要加载的类，并创建他们的实例放到容器里，实例化时还会根据该类的构造器参数自动注入依赖。主要是通过 Reflect.defineMetadata 和 Reflect.getMetadata 实现

```js
// 现在 metadata 的 api 还在草案阶段，需要使用 reflect-metadata 这个 polyfill 包才行
import "reflect-metadata";

// 解决ts提示
const Reflect1: any = Reflect;

// classDecorator 通过@ClassDecoratorFn() 结合  "emitDecoratorMetadata": true, ts自动会生成类构造函数元数据
const ClassDecoratorFn = (): ClassDecorator => (target: Function) => {};

// 容器container
class Container {
  providers = new Map();

  addProvider(name, provider) {
    this.providers.set(name, provider);
  }

  getProvider(name) {
    return this.providers.get(name);
  }
}

// service
class Service1 {
  a = 1;
}

@ClassDecoratorFn()
class Service {
  // 通过class Type 传递参数， 通过Reflect1.getMetadata("design:paramtypes", Service)可以拿到参数数组
  constructor(private readonly service1: Service1) {}

  log() {
    console.log(this.service1.a);
  }
}

// controller
class Controller1 {
  b = 2;
}

@ClassDecoratorFn()
class Controller {
  // 通过class Type 传递参数， 通过Reflect1.getMetadata("design:paramtypes", Controller)可以拿到参数数组
  constructor(controller1: Controller1) {}
}

// 收集依赖
function Module(obj: Object) {
  return (target) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        Reflect1.defineMetadata(key, obj[key], target);
      }
    }
  };
}
@Module({
  providers: [Service],
  controllers: [Controller],
})
class AppModule {}

function Factory(target: Function) {
  // 拿到通过@Module 设置的元数据
  const providers = Reflect1.getMetadata("providers", target);
  const controllers = Reflect1.getMetadata("controllers", target);
  const container = new Container();

  providers.forEach((provider) => {
    // 通过design:paramtypes 可以拿到类的构造器参数
    const args = Reflect1.getMetadata("design:paramtypes", provider);
    // 参数也是类
    const argsIns = args.map((arg) => new arg());
    const providerIns = new provider(...argsIns);
    // 将实例化的provider 通过名字存入map
    container.addProvider(provider.name, providerIns);

    // 通过名字获取实例后的类
    container.getProvider(provider.name).log(); // 1
  });
}

Factory(AppModule);
```
