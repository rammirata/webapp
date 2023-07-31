from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class SwapTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def set_specific_params(self, log_values):
        raise NotImplementedError("Each Swap type must implement this method")

    def process(self):
        self.transaction_type = TransactionType.SWAP

        swap_map = {
            "Withdrawal": WithdrawalTransaction,
            "Deposit": DepositTransaction,
            "Transfer": TransferSwapTransaction,
        }

        log_values = self.get_logs_values()

        for value in log_values:
            if value["event_name"] in swap_map:
                swap_map[value["event_name"]](
                    address=self.address,
                    block=self.block
                ).set_specific_params(value)


class WithdrawalTransaction(SwapTransaction):
    def set_specific_params(self, log_values):
        self.from_address = log_values["values"][0]
        self.to_address = self.address
        self.contract_address = self.block["to_address"]
        self.token = log_values["sender_name"]
        self.token_category = TokenCategory.get_category(self.token)
        self.direction = "IN"
        self.set_amount_value(
            decimals_amount=log_values["values"][-1],
            contract_decimals=log_values["sender_contract_decimals"]
        )


class TransferSwapTransaction(SwapTransaction):
    def set_specific_params(self, log_values):
        self.from_address = log_values["values"][0]
        self.to_address = log_values["values"][1]
        self.contract_address = log_values["sender_address"]
        self.token = log_values["sender_name"]
        self.token_category = TokenCategory.get_category(self.token)
        self.direction = "IN" if str(self.address).lower() == str(log_values["values"][1]).lower() else "OUT"
        self.set_amount_value(
            decimals_amount=log_values["values"][-1],
            contract_decimals=log_values["sender_contract_decimals"]
        )


class DepositTransaction(SwapTransaction):
    def set_specific_params(self, log_values):
        self.from_address = self.address
        self.to_address = log_values["values"][0]
        self.contract_address = log_values["sender_address"]
        self.token = log_values["sender_name"]
        self.token_category = TokenCategory.get_category(self.token)
        self.direction = "OUT"
        self.set_amount_value(
            decimals_amount=log_values["values"][-1],
            contract_decimals=log_values["sender_contract_decimals"]
        )

