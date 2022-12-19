// 判断是否是对象
function isObject(obj: any): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

// 深拷贝
function cloneDeep(val: any): any {
  if (Array.isArray(val)) {
    return val.map((item) => cloneDeep(item));
  } else if (isObject(val)) {
    const result = {};
    for (const key in val) {
      result[key] = cloneDeep(val[key]);
    }

    return result;
  }

  return val;
}

// 合并对象 ({ a: 1, b: { c: 2 } }, { a: 4, b: { d: 5 } }) => { a: 4, b: { c: 2, d: 5 } }
function assignObj(
  obj: Record<string, any>,
  values: Record<string, any>
): Record<string, any> {
  const newObj = { ...obj };

  if (!values) {
    return newObj;
  }

  Object.keys(values).forEach((key) => {
    const preValue = obj[key];
    const value = values[key];
    const recursive = isObject(preValue) && isObject(value);
    newObj[key] = recursive ? assignObj(preValue, value) : cloneDeep(value);
  });

  return newObj;
}

// 根据path数组查询对象中的value
function getValueByPath(obj: object, path: string[]): any {
  let val = obj;
  for (let i = 0; i < path.length; i++) {
    if (val === null || val === undefined) {
      return undefined;
    }

    val = val[path[i]];
  }

  return val;
}
