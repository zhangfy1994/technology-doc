// 数组去重
function unique(arr) {
  return Array.from(new Set(arr));
}

function unique2(arr) {
  const result = [];
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      result.push(arr[i]);
    }
  }

  return result;
}

function unique3(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.incudes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// 数组扁平
function myFlat(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(myFlat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}
