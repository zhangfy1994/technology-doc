// 实现promiseAll
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error(`promises需要 Array 类型`);
    }

    const result = [];
    promises.forEach((item, index) => {
      item
        .then((res) => {
          result[index] = res;
          if (result.length === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

// 实现控制并发个数的promiseAll
function promiseAllLimit(promises, limit) {
  return new Promise((resolve, reject) => {
    const result = [];
    let index = 0;

    function step(i) {
      index = i;
      promises[i]
        .then((res) => {
          result[i] = res;
          if (result.length === promises.length) {
            resolve(result);
          } else {
            step(index + 1);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }

    for (let i = 0; i < limit; i++) {
      step(i);
    }
  });
}
