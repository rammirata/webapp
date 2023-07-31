const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletTokensSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: [true, 'Cannot proceed without a walletTokens address']
  },
  tokensHistory: {
    type: Array,
    default: []
  },
  tokenBalances: {
    type: Array,
    default: []
  },
});

const WalletTokens =
  mongoose.models.walletTokens || mongoose.model("WalletTokens", walletTokensSchema);

module.exports = WalletTokens;
