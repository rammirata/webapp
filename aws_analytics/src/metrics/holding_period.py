from collections import defaultdict
from datetime import datetime


def average_holding_period(transactions, today=datetime.today()):
    total_holding_period = 0
    total_volume = 0

    # divide transactions into buy and sell per token {token1: [[bought], [sold]], token2: [[bought], [sold]].....}
    tokens_transactions = defaultdict(lambda: [[], []])
    for transaction in transactions:
        token = transaction['token']
        direction = transaction['dir']
        amount = abs(transaction['amount'])
        date = datetime.strptime(transaction['transaction_date'], "%Y-%m-%dT%H:%M:%SZ")
        if token != 'None':
            token_list = tokens_transactions[token]
            if direction == 'IN':
                token_list[0].append((token, direction, amount, date))
            else:
                token_list[1].append((token, direction, amount, date))

    # for each token calculate its holding period
    for token in tokens_transactions.copy().keys():
        acc = 0
        buys = tokens_transactions[token][0].copy()
        sells = tokens_transactions[token][1].copy()

        # If there are no sell transactions, calculate the holding period of each buy transaction
        if len(sells) == 0:
            for b in buys:
                acc += b[2] * (today - b[3]).days

        else:
            # if there is a sell before a buy, we missed a tx somewhere and cant calculate holding period for token
            if not buys or sells[0][3] < buys[0][3]:
                del tokens_transactions[token]
                continue

            # If there are sell transactions, calculate the holding period for each one
            for s in sells:
                amount_sold = s[2]
                date_sold = s[3]
                i = 0
                while i < len(buys):
                    b = buys[i]
                    if b[2] <= 0:
                        buys.pop(i)
                        continue
                    amount_bought = b[2]
                    date_bought = b[3]
                    if amount_sold > amount_bought:
                        # If the sell amount > the buy amount, calc the holding period for the entire buy transaction
                        acc += amount_bought * (date_sold - date_bought).days
                        amount_sold -= amount_bought
                        buys[i] = b[0], b[1], 0, b[3]
                        i += 1
                    else:
                        # If sell amount <= buy amount, calc the holding for the remaining sell amount and exit loop
                        acc += amount_sold * (date_sold - date_bought).days
                        buys[i] = b[0], b[1], b[2] - amount_sold, b[3]
                        if buys[i][2] == 0:
                            buys.pop(i)
                        break

            # If there are any remaining buy transactions, calculate holding period of each and add to amount
            if len(buys) > 0:
                for b in buys:
                    acc += b[2] * (today - b[3]).days

        token_volume = sum(i[2] for i in tokens_transactions[token][0]) + sum(i[2] for i in tokens_transactions[token][1])
        total_volume += token_volume
        token_holding_period = acc / sum(i[2] for i in tokens_transactions[token][0])
        token_holding_period_weighted = token_holding_period * token_volume
        total_holding_period += token_holding_period_weighted

    print(total_holding_period / total_volume)

    return total_holding_period / total_volume
