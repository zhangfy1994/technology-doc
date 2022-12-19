// 处理url query
const parseUrlQuery = (url: string) => {
  const obj: Record<string, any> = {};

  let search = url?.split("?")[1];
  if (!search) {
    return obj;
  }

  // 将search 用 & 分割
  const searchArr = search.split("&");
  for (let i = 0; i < searchArr.length; i++) {
    const item = searchArr[i];
    let key, val;
    // 判断每项是否有 =
    const index = item.indexOf("=");
    if (index >= 0) {
      key = item.substring(0, index);
      val = item.substring(index + 1);
    } else {
      key = item;
      val = "";
    }

    // decode
    key = decodeURIComponent(key);
    val = decodeURIComponent(val);

    // 判断key 是否重复， 重复val使用array
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = val;
    } else if (Array.isArray(obj[key])) {
      obj[key].push(val);
    } else {
      obj[key] = [obj[key], val];
    }
  }

  return obj;
};
