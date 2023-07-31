from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class AirdropTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def process(self):
        logs_values = self.get_logs_values()
        for logs in logs_values:
            if len(logs["values"]) == 3 and self.address.lower() in logs["values"]:
                self.from_address = logs["values"][0]
                self.to_address = logs["values"][1]
                self.contract_address = logs["sender_address"]
                self.token = logs["sender_name"]
                self.transaction_type = TransactionType.AIRDROP
                self.direction = "IN" if self.address.lower() == logs["values"][1].lower() else "OUT"
                self.token_category = TokenCategory.get_category(logs["sender_name"])

                self.set_amount_value(
                    decimals_amount=logs["values"][-1],
                    contract_decimals=logs["sender_contract_decimals"]
                )

                break
