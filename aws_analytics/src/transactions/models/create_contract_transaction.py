from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class CreateContractTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def process(self):
        self.transaction_type = TransactionType.CONTRACT_CREATED
        self.from_address = self.block["from_address"]
        self.to_address = self.block["to_address"]
        self.contract_address = None
        self.token = None
        self.token_category = TokenCategory.get_category(self.token)
        self.set_amount_value(
            decimals_amount=self.block["value"],
            contract_decimals=0
        )