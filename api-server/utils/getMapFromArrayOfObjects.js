const getMapFromArrayOfObjects = (list, key, deleteKeyFromPayload = false) => {
  const map = new Map();
  list.map((item) => {
    const itemKey = item[key];
    if (deleteKeyFromPayload) delete item[key];
    map.set(itemKey, item);
  });
  return map;
};

module.exports = getMapFromArrayOfObjects;
