from src.config.settings import CHAIN_ID, COVALENT_HOME
import requests


def all_balances_for_address(address, api_key):
    balances_info = requests.get(
        f'https://{COVALENT_HOME}/{CHAIN_ID}/address/{address}/balances_v2/?page-size=15000&key={api_key}'
    ).json()
    data_items = balances_info["data"]["items"]

    non_dust_balances = [
        item for item in data_items if item["type"] != "dust"
    ]
    token_balances = {}

    for balance in non_dust_balances:
        if balance["balance"] and balance["quote_rate"] and balance["quote_rate_24h"] and balance["contract_decimals"]:
            decimals_amount = int(balance["balance"])
            decimal_amount = decimals_amount / (10 ** balance["contract_decimals"])
            token_balances[balance["contract_name"]] = decimal_amount

    total_value = 0.0
    for balance in non_dust_balances:
        actual_balance = token_balances.get(balance["contract_name"], 0.0)
        quote_rate = balance["quote_rate"] if balance["quote_rate"] else 0.0
        total_value += actual_balance * quote_rate

    return token_balances, total_value
