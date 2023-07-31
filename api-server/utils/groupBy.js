const groupBy = (fn, list) =>
  list.reduce(
    (prev, next) => ({
      ...prev,
      [fn(next)]: [...(prev[fn(next)] || []), next],
    }),
    {}
  );

module.exports = groupBy;
