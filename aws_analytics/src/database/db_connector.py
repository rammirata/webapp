import json

from pymongo import MongoClient

from src.config.settings import MONGO_URI


def connect_to_db():
    print(MONGO_URI)
    client = MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True)
    db = client.get_default_database()
    return db


def update_contract_categories(db, collection_name, field_name):
    """
        update_contract_categories(
            db=db,
            collection_name="contractaddresses",
            field_name="categories"
        )
    """

    collection = db[collection_name]
    for document in collection.find():
        print(f"Updating: {document['_id']}")
        string_list = document.get(field_name, None)
        if isinstance(string_list, str):  # Check if the value is a string
            try:
                updated_value = json.loads(string_list.replace("'", "\"")) if string_list else []
            except json.JSONDecodeError:
                updated_value = [string_list]
        else:
            updated_value = string_list if isinstance(string_list, list) else []
        collection.update_one({"_id": document["_id"]}, {"$set": {field_name: updated_value}})
