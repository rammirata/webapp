from enum import Enum

from src.database.db_connector import connect_to_db


class TokenCategory(Enum):
    META = "Meta"
    DEFI = "Defi"
    GAMING = "Gaming"
    NFT = "NFT"
    NOT_FOUND = "Not Found"

    @staticmethod
    def get_category(token_address):
        # db = connect_to_db()
        # collection = db["contractaddresses"]
        # cursor = collection.find({"categories": {"$in": [token_address]}})
        # try:
        #    next(cursor)
        #    cursor.rewind()
        #    return TokenCategory.NFT
        # except StopIteration:
        #    return TokenCategory.NOT_FOUND
        return TokenCategory.NOT_FOUND


    @staticmethod
    def categorize_token(token, tokens_list):
        # ToDo - change this logic so we can use ROBERTS MASSIVE TABLE
        token = str(token).lower().replace(" ", "")
        return token in tokens_list