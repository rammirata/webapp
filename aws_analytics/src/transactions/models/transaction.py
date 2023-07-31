from abc import ABC

from src.tokens.models.token_type import TokenType


class Transaction(ABC):
    def __init__(self, address, block):
        self.address = address
        self.block = block
        self.date = block["block_signed_at"]
        self.hash = block["tx_hash"]
        self.gas_spent = block["gas_spent"]
        self.gas_price = block["gas_price"]
        self.fees_paid = block["fees_paid"]

        self.from_address = None
        self.to_address = None
        self.contract_address = None
        self.transaction_type = None
        self.direction = None
        self.amount = None

        self.token = None
        self.token_category = None
        self.token_type = None

        self.ens_name = None

    def process(self):
        raise NotImplementedError("Subclasses must implement this method")

    def get_logs_values(self):
        values = []
        for log_event in self.block.get("log_events", {}):
            param_names = []
            param_values = []
            event_params = log_event.get("decoded", {}).get("params", {}) if log_event["decoded"] else None
            if event_params:
                for parameters in event_params:
                    param_names.append(parameters.get("name"))
                    param_values.append(parameters.get("value"))

                sender_values_dictionary = {
                    "event_name": log_event["decoded"]["name"],
                    "sender_address": log_event["sender_address"],
                    "sender_name": log_event["sender_name"],
                    "sender_contract_decimals": log_event["sender_contract_decimals"],
                    "param_names": param_names,
                    "values": param_values,
                }

                values.append(sender_values_dictionary)
        return values

    def set_amount_value(self, decimals_amount, contract_decimals):
        try:
            decimals_amount = int(decimals_amount)
            actual_amount = decimals_amount / (10 ** contract_decimals)
        except (ValueError, TypeError):
            actual_amount = 1
            self.token_type = TokenType.ERC_721
        else:
            self.token_type = TokenType.ERC_20

        self.amount = -actual_amount if self.direction == "OUT" and actual_amount > 0 else actual_amount

    def to_dict(self):
        return {
            "address": self.address,
            "hash": self.hash,
            "from_address": self.from_address,
            "to_address": self.to_address,
            "ens_name": self.ens_name,
            "transaction_date": self.date,
            "token": self.token,
            "transaction_type": self.transaction_type,
            "token_category": self.token_category
        }
