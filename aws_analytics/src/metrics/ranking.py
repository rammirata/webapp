from datetime import datetime


def calculate_rank(value, rule):
    if isinstance(value, str):
        value_date = datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ')
        value = value_date.year

    for threshold, ranking in rule:
        if value < threshold:
            return ranking


def rank(calculated_metrics):
    # Define the weights for each feature
    weights = {'transaction_number': 0.4, 'total_worth': 0.3, 'holding_period': 0.2, 'latest_transaction': 0.1}

    # Define the rules for each feature
    rules = {
        'transaction_number': [(10, 1), (50, 2), (100, 3), (500, 4), (float('inf'), 5)],
        'total_worth': [(1000, 1), (10000, 2), (100000, 3), (1000000, 4), (float('inf'), 5)],
        'holding_period': [(30, 1), (90, 2), (180, 3), (365, 4), (float('inf'), 5)],
        'latest_transaction': [(2021, 1), (2022, 2), (2023, 3), (2024, 4), (float('inf'), 5)]
    }

    ranking = 0
    total_weight = 0

    for feature, weight in weights.items():
        column = calculated_metrics[feature]
        feature_rank = column.apply(calculate_rank, args=(rules[feature],))
        ranking += weight * feature_rank
        total_weight += weight

    ranking = round((ranking / total_weight).values[0])

    return ranking