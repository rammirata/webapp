from src.metrics.holding_period import average_holding_period
from datetime import datetime
import math


def test_average_holding_period():
    data = [{'token': 'A', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-01T12:18:47Z"},
            {'token': 'A', 'amount': 10, 'dir': 'OUT', 'transaction_date': "2023-01-21T12:18:47Z"},
            {'token': 'A', 'amount': 40, 'dir': 'IN', 'transaction_date': "2023-01-31T12:18:47Z"},
            {'token': 'B', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-01T12:18:47Z"},
            {'token': 'B', 'amount': 20, 'dir': 'OUT', 'transaction_date': "2023-01-21T12:18:47Z"},
            {'token': 'B', 'amount': 40, 'dir': 'IN', 'transaction_date': "2023-01-31T12:18:47Z"},
            {'token': 'C', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-01T12:18:47Z"},
            {'token': 'C', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-21T12:18:47Z"},
            {'token': 'C', 'amount': 20, 'dir': 'OUT', 'transaction_date': "2023-01-31T12:18:47Z"},
            {'token': 'C', 'amount': 40, 'dir': 'IN', 'transaction_date': "2023-02-10T12:18:47Z"},
            {'token': 'D', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-01T12:18:47Z"},
            {'token': 'D', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-21T12:18:47Z"},
            {'token': 'D', 'amount': 30, 'dir': 'OUT', 'transaction_date': "2023-01-31T12:18:47Z"},
            {'token': 'D', 'amount': 40, 'dir': 'IN', 'transaction_date': "2023-02-10T12:18:47Z"},
            {'token': 'E', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-01T12:18:47Z"},
            {'token': 'E', 'amount': 20, 'dir': 'IN', 'transaction_date': "2023-01-21T12:18:47Z"},
            {'token': 'E', 'amount': 30, 'dir': 'OUT', 'transaction_date': "2023-01-31T12:18:47Z"},
            {'token': 'E', 'amount': 10, 'dir': 'OUT', 'transaction_date': "2023-02-10T12:18:47Z"},
            {'token': 'E', 'amount': 40, 'dir': 'IN', 'transaction_date': "2023-02-20T12:18:47Z"},
            ]
    expected_output = 24.53
    tolerance = 0.1
    assert math.isclose(average_holding_period(data, today=datetime.strptime("2023-03-02T12:18:47Z", "%Y-%m-%dT%H:%M:%SZ")), expected_output, rel_tol=tolerance)
