const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blockDataSchema = new Schema({
  tx_hash: {
    type: String,
  },
  transaction_date: {
    type: Date,
    required: [true, "Cannot proceed without a transaction date"],
  },
  from_address: {
    type: String,
    required: [true, "Cannot proceed without a from address"],
  },
  to_address: {
    type: String,
    required: [true, "Cannot proceed without a to address"],
  },
  contract_address: {
    type: String,
    required: [true, "Cannot proceed without a contract address"],
  },
  token_type: {
    type: String,
  },
  token: {
    type: String,
  },
  tx_type: {
    type: String,
  },
  amount: {
    type: Number,
  },
  gas_spent: {
    type: Number,
  },
  gas_price: {
    type: Number,
  },
  fees_paid: {
    type: Number,
  },
  ENS_name: {
    type: String,
  },
});

blockDataSchema.index({ tx_hash: 1, from_address: 1, to_address: 1 });
blockDataSchema.index({ to_address: 1 });
blockDataSchema.index({ from_address: 1 });

const BlockData =
  mongoose.models.blockData || mongoose.model("BlockData", blockDataSchema);

module.exports = BlockData;
