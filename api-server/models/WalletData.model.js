const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletDataSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: [true, 'Cannot proceed without a wallet address']
  },
  // _id: {
  //   type: String,
  //   unique: true,
  //   required: [true, 'Cannot proceed without a wallet address']
  // },
  numTx: {
    type: Number,
    default: 0,
  },
  firstTx: {
    type: Date,
    default: null,
  },
  latestTx: {
    type: Date,
    default: null,
  },
  numNftTx: {
    type: Number,
    default: 0,
  },
  ensNames: {
    type: [String]
  },
  numSwaps: {
    type: Number,
    default: 0,
  },
  numAirdrops: {
    type: Number,
    default: 0,
  },
  metaverseInteractions: {
    type: Number,
    default: 0,
  },
  defiInteractions: {
    type: Number,
    default: 0,
  },
  gamingInteractions: {
    type: Number,
    default: 0,
  },
  totalWorth: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'success'
  },
  errorMsg: {
    type: String,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: null,
  }
});

const WalletData =
  mongoose.models.walletData || mongoose.model("WalletData", walletDataSchema);

module.exports = WalletData;
