// 构造千分位分割
function thousandSplit(num) {
  return Intl.NumberFormat("en-US").format(num);
}

// 把一个JSON对象的key从下划线形式（Pascal）转换到小驼峰形式（Camel）
function getCamelCase(str) {
  return str.replace(/_(a-z)g/, (all, i) => i.toUpperCase());
}

// 数组转树
function arrToTree(arr) {
  const arrCopy = JSON.parse(JSON.stringify(arr));
  const result = [];

  // 先将数组每一项保存到map中
  const map = arrCopy.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});

  // 循环每一项，放到父元素的children中
  for (const key in map) {
    const item = map[key];
    if (item.parentId === null) {
      result.push(item);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
  }

  return result;
}

// sleep 函数
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
