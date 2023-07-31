function buildFilterQuery(req, res, next) {
  const { addressGroup } = req.$scope;
  const filters = req.body.filters;

  const addresses = addressGroup.addresses;
  const baseFilters = { address: { $in: addresses } };

  if (!filters || !Array.isArray(filters)) {
    req.$scope.filters = baseFilters;
    return next();
  }

  // Iterate through filters and apply them to the baseFilters
  filters.forEach((filter) => {
    const { filterColumn, filterOperator, filterValue } = filter;

    if (!filterColumn || !filterOperator || !filterValue) {
      return;
    }

    const operator = mapOperatorToMongo(filterOperator);
    if (baseFilters[filterColumn]) {
      baseFilters[filterColumn][operator] = filterValue;
    } else {
      baseFilters[filterColumn] = { [operator]: filterValue };
    }
  });

  req.$scope.filters = baseFilters;
  return next();
}
  
  function mapOperatorToMongo(operator) {
    switch (operator) {
      case '>':
        return '$gt';
      case '<':
        return '$lt';
      case '>=':
        return '$gte';
      case '<=':
        return '$lte';
      case '=':
        return '$eq';
      default:
        throw new Error('Invalid operator');
    }
  }

module.exports = {
  build: buildFilterQuery
};