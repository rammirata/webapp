import pandas as pd

from src.lambda_function import lambda_handler
from tests.utils.test_lambda_function_utils import get_addresses_from_csv


def test_lambda_handler():
    addresses = get_addresses_from_csv('../data/input/quoth_airdrop_150.csv')[0:1]
    record_list = []
    for address in addresses:
        records_all = lambda_handler({"_addresses": address, "api_key": "ckey_a386e73b5e2c48b2aa25da7d393"}, None)
        record_list.append(records_all)
        df = pd.DataFrame.from_records(record_list)
        print(records_all)


test_lambda_handler()
