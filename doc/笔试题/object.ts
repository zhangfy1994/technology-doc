// 深拷贝
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepCopy2(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy2(item));
  } else if (isObject(obj)) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = deepCopy2(obj[key]);
    }
    return newObj;
  } else {
    return obj;
  }
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// 扁平化js对象
function isObj(o) {
  return typeof o === "object" && o !== null;
}

function flattenObj(obj) {
  const res = {};

  function recurse(curr, path = "") {
    if (Array.isArray(curr)) {
      curr.forEach((item, index) => {
        recurse(item, path ? `${path}.[${index}]` : `[${index}]`);
      });
    } else if (isObj(curr)) {
      for (let key in curr) {
        const newPath = path ? `${path}.${key}` : key;
        if (isObj(curr[key])) {
          recurse(curr[key], newPath);
        } else {
          res[newPath] = curr[key];
        }
      }
    } else if (path) {
      res[path] = curr;
    }
  }
  recurse(obj);

  return res;
}
