def exclude_from_dict(_dict: dict, *keys: list[str]):
    """
        Loops through the keys and if a key exists in the dictionary, the key and value get deleted
    """
    for x in keys:
        if _dict[x]:
            del _dict[x]

    return _dict
