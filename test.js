const nestedObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
  f: 4,
  g: [1, 2, { h: 1, k: 2, l: { m: 1 } }],
};

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

console.log(JSON.stringify(flattenObj(nestedObject)));
