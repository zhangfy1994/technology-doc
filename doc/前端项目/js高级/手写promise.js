const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class MyPromise {
  value;
  status = PENDING;
  reason;
  resolveCbs = [];
  rejectedCbs = [];
  constructor(exec) {
    try {
      exec(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(val) {
    if (this.status === PENDING) {
      this.value = val;
      this.status = RESOLVED;
      for (let i = 0; i < this.resolveCbs.length; i++) {
        this.resolveCbs[i](val);
      }
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
      for (let i = 0; i < this.rejectedCbs.length; i++) {
        this.rejectedCbs[i](reason);
      }
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === "function" ? onFulfilled : (v) => v;

    let promise2;

    if (this.status === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolveCbs.push((val) => {
          const x = onFulfilled(val);
          resolve(x);
        });

        this.rejectedCbs.push((reason) => {
          const x = onRejected(reason);
          reject(x);
        });
      });
    }

    if (this.status === FULFILLED) {
      promise2 = new MyPromise((resolve, reject) => {
        const x = onFulfilled(this.value);
        resolve(x);
      });

      if (this.status === REJECTED) {
        promise2 = new MyPromise((resolve, reject) => {
          const x = onRejected(this.reason);
          reject(x);
        });
      }
      return promise2;
    }
  }
}
