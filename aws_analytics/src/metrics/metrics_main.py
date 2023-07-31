from .balances import all_balances_for_address
from .simple_metrics import calculate_simple_metrics


def calculate_metrics(address, transactions, api_key):
    balances, total_worth = all_balances_for_address(address, api_key)
    metrics = calculate_simple_metrics(transactions)
    metrics["total_worth"] = total_worth
    metrics["token_balances"] = balances

    return metrics
