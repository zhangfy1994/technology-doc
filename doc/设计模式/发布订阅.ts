class PublishSubscribe {
  private eventMap = new Map();

  checkParams(event: string, cb: Function, type: "on" | "off") {
    let eventTip = "";
    let cbTip = "";
    switch (type) {
      case "on":
        eventTip = "订阅事件名称";
        cbTip = "订阅回调函数";
        break;
      case "off":
        eventTip = "取消订阅事件名称";
        cbTip = "取消订阅回调函数";
        break;
      default:
        break;
    }
    if (typeof event !== "string") {
      throw new Error(`${eventTip}需要 String 类型`);
    }
    if (typeof cb !== "function") {
      throw new Error(`${cbTip}需要 Function 类型`);
    }
  }

  /**
   * @description:
   * @param {string} event 要订阅的事件
   * @param {Function} cb 订阅回调
   * @return {Function} 取消订阅函数
   */
  on(event: string, cb: Function): () => void {
    this.checkParams(event, cb, "on");

    const subscribeArr = this.eventMap.get(event);
    if (Array.isArray(subscribeArr)) {
      subscribeArr.push(cb);
    } else {
      const newSubscribeArr = [cb];
      this.eventMap.set(event, newSubscribeArr);
    }

    return () => {
      this.off(event, cb);
    };
  }

  /**
   * @description:
   * @param {string} event 要取消订阅的事件
   * @param {Function} cb 取消订阅的回调
   * @return {*}
   */
  off(event: string, cb: Function) {
    this.checkParams(event, cb, "off");

    const subscribeArr = this.eventMap.get(event);
    if (Array.isArray(subscribeArr)) {
      const index = subscribeArr.findIndex((item) => item === cb);
      if (index >= 0) {
        subscribeArr.splice(index, 1);
      }
    }
  }

  /**
   * @description:
   * @param {string} event 触发订阅事件
   * @param {any} data 回调data
   * @return {*}
   */
  emit(event: string, data?: any) {
    if (typeof event !== "string") {
      throw new Error(`触发订阅需要 String 类型`);
    }

    const subscribeArr = this.eventMap.get(event);
    if (Array.isArray(subscribeArr)) {
      subscribeArr.forEach((cb) => cb(data));
    }
  }
}
