from typing import Dict, List

from src.transactions.models.transaction import Transaction
from src.transactions.models.airdrop_transaction import AirdropTransaction
from src.transactions.models.create_contract_transaction import CreateContractTransaction
from src.transactions.models.ens_transaction import ENSTransaction
from src.transactions.models.ether_transfer_transaction import EtherTransferTransaction
from src.transactions.models.sold_nft_opensea_transaction import SoldNFTOpenSeaTransaction
from src.transactions.models.swap_transaction import SwapTransaction
from src.transactions.models.transfer_transaction import TransferTransaction


def classify_transactions(address_data: Dict) -> List[Transaction]:
    transactions = []
    address = address_data['data']['address']
    for block in address_data['data']['items']:
        if not block["to_address"]:
            # when a contract is created the to field is none
            transaction = CreateContractTransaction(address=address, block=block)
        elif block["value"] != str(0) and not block["log_events"]:
            transaction = EtherTransferTransaction(address=address, block=block)
        else:
            event_names = [event["decoded"]["name"] if event["decoded"] else None for event in block["log_events"]]
            if "NameRegistered" in event_names:
                transaction = ENSTransaction(address=address, block=block)
            elif "Swap" in event_names:
                transaction = SwapTransaction(address=address, block=block)
            elif "OrdersMatched" in event_names:
                transaction = SoldNFTOpenSeaTransaction(address=address, block=block)
            elif len(event_names) > 100:
                transaction = AirdropTransaction(address=address, block=block)
            elif "Transfer" in event_names:
                transaction = TransferTransaction(address=address, block=block)
            else:
                continue

        transaction.process()
        transactions.append(transaction.to_dict())

    return transactions
