import configparser

CONFIG_FILE_PATH = '../resources/application.properties'

config = configparser.ConfigParser()
config.read(CONFIG_FILE_PATH)

MONGO_URI = config['GENERAL']['MONGO_URI']

COVALENT_HOME = config['GENERAL']['COVALENT_HOME']
CHAIN_ID = config['NETWORKS']['ETHEREUM_MAINNET']
