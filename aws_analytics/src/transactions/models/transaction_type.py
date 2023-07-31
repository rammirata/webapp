from enum import Enum


class TransactionType(Enum):
    FEE_TAKER = "fee taker"
    CONTRACT_CREATED = "contract created"
    ETH_TRANSFER = "ETH transfer"
    ENS_DOMAIN = "ENS Domain"
    SWAP = "SWAP"
    SOLD_NFT = "NFT Sold"
    BUY_NFT = "NFT Bought"
    AIRDROP = "Airdrop"
    TRANSFER = "Transfer"
