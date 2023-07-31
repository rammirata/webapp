from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class SoldNFTOpenSeaTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def process(self):
        log_values = self.get_logs_values()

        for logs in log_values:
            addresses_dictionary = {name: logs["values"][i] for i, name in enumerate(logs["param_names"])}
            seller_address = addresses_dictionary.get("maker")
            buyer_address = addresses_dictionary.get("taker")
            sold_for = addresses_dictionary.get("price")

            if seller_address and buyer_address and sold_for:
                self.from_address = buyer_address
                self.to_address = seller_address
                self.contract_address = logs["sender_address"]
                self.token = logs["sender_name"]
                self.token_category = TokenCategory.get_category(self.token)

                if seller_address == self.address.lower():
                    self.transaction_type = TransactionType.SOLD_NFT
                    self.direction = "IN"
                    self.set_amount_value(
                        decimals_amount=seller_address,
                        contract_decimals=18
                    )
                elif buyer_address == self.address.lower():
                    self.transaction_type = TransactionType.BUY_NFT
                    self.direction = "OUT"
                    self.set_amount_value(
                        decimals_amount=buyer_address,
                        contract_decimals=18
                    )
                break