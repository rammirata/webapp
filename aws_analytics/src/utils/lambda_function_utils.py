

def stringify_keys(obj):
    if isinstance(obj, dict):
        return {str(key): stringify_keys(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [stringify_keys(item) for item in obj]
    else:
        return obj
