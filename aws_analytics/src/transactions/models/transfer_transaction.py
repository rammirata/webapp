from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class TransferTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def process(self):
        logs_values = self.get_logs_values()
        for logs in logs_values:
            if len(logs["values"]) == 3 and self.address.lower() in logs["values"]:
                self.from_address = logs["values"][0]

                if isinstance(logs["values"][1], list):
                    self.to_address = logs["values"][1][0]["value"]
                else:
                    self.to_address = logs["values"][1]

                self.contract_address = logs["sender_address"]
                self.token = logs["sender_name"]
                self.transaction_type = TransactionType.TRANSFER

                if self.to_address:
                    self.direction = "IN" if self.address.lower() == self.to_address.lower() else "OUT"
                else:
                    self.direction = "OUT"

                self.set_amount_value(
                    decimals_amount=logs["values"][-1],
                    contract_decimals=logs["sender_contract_decimals"]
                )