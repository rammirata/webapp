from src.tokens.models.token_category import TokenCategory
from src.transactions.models.transaction import Transaction
from src.transactions.models.transaction_type import TransactionType


class ENSTransaction(Transaction):
    def __init__(self, address, block):
        super().__init__(address, block)

    def get_domain_and_bought_amount(self):
        ens_domain_name = None
        ens_domain_bought_amount = None

        for event in self.block["log_events"]:
            # try:
            if event["decoded"]["name"] == "NameRegistered":
                for parameter in event["decoded"]["params"]:
                    if parameter["name"] == "name":
                        ens_domain_name = parameter["value"] + ".eth"
                    elif parameter["name"] == "cost":
                        ens_domain_bought_amount = int(self.block["value"])
            # except:
            #     continue
        return ens_domain_name, ens_domain_bought_amount


    def process(self):
        # ENS event consists of 3 transactions.
        #       Only the transactions with the event NameRegistered is important
        #       and only the NameRegistered event with params name and cost are important

        ens_domain_name, ens_domain_bought_amount = self.get_domain_and_bought_amount()

        log_values = self.get_logs_values()

        for log_value in log_values:
            if log_value["event_name"] == "NameRegistered":
                pass

        for event in self.block.get("log_events"):
            if event.get("decoded", {}).get("name") == "NameRegistered":
                if ens_domain_name and ens_domain_bought_amount:
                    # Record the movement of Ether and ENS tokens related
                    # to the ENS domain registration.
                    self.from_address = self.block["from_address"]
                    self.to_address = self.block["to_address"]
                    self.contract_address=self.block["to_address"]
                    self.token = "Ether"
                    self.transaction_type = TransactionType.ENS_DOMAIN
                    self.ens_name = ens_domain_name
                    self.token_category = TokenCategory.get_category(self.token)
                    self.direction = "OUT"
                    self.set_amount_value(
                        decimals_amount=ens_domain_bought_amount,
                        contract_decimals=18
                    )
                    break
