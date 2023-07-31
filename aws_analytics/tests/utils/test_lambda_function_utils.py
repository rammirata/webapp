import csv


def get_addresses_from_csv(csv_file):
    file_read = open(csv_file)
    csv_reader = csv.reader(file_read)
    addresses = [row[0] for row in csv_reader]
    file_read.close()
    return addresses
