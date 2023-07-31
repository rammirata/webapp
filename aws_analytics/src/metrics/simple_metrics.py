import pandas as pd


def calculate_simple_metrics(transactions):

    # use pandas for faster aggregations
    df = pd.DataFrame(transactions)
    address = df["address"].iloc[0]
    transaction_number = df["hash"].nunique()
    ens_names = df["ens_name"].dropna().unique().tolist()
    first_transaction = df["transaction_date"].min()
    latest_transaction = df["transaction_date"].max()
    token_history = df["token"].value_counts().to_dict()
    nft_transactions = (df["transaction_type"] == 'Transfer').sum()
    swaps_transactions = (df["transaction_type"] == 'SWAP').sum() // 2
    airdrops_transactions = (df["transaction_type"] == 'AIRDROP').sum()
    metaverse_interaction = (df["token_category"] == 'META').sum()
    defi_interaction = (df["token_category"] == 'DEFI').sum()
    gaming_interaction = (df["token_category"] == 'GAMING').sum()

    return {
            "address": address,
            "transaction_number": transaction_number,
            "ens_names": ens_names,
            "first_transaction": first_transaction,
            "latest_transaction": latest_transaction,
            "token_history": token_history,
            "nft_transactions": nft_transactions,
            "swaps_transactions": swaps_transactions,
            "airdrops_transactions": airdrops_transactions,
            "metaverse_interaction": metaverse_interaction,
            "defi_interaction": defi_interaction,
            "gaming_interaction": gaming_interaction,
    }
