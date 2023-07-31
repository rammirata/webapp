from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class EtherTransferTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def process(self):
        self.token = "Ether",
        self.transaction_type = TransactionType.ETH_TRANSFER,
        self.from_address = self.block.get("from_address", None)
        self.to_address = self.block.get("to_address", None)
        self.token_category = TokenCategory.get_category(self.token)
        self.direction = "IN" if self.address.lower() == self.block.get("to_address").lower() else "OUT"

        self.set_amount_value(
            decimals_amount=self.block.get("value", None),
            contract_decimals=18
        )
