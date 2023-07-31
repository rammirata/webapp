const groupBy = require("./groupBy");

const collectBy = (fn, list) => Object.values(groupBy(fn, list));

module.exports = collectBy;
