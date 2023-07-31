const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chainDataSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Cannot proceed without an API key']
  },
  abbreviation: {
    type: String,
    unique: true,
    required: [true, 'Cannot proceed without an API key']
  },
  lastBlockUpdated: {
    type: String,
    default: null,
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

const ChainData =
  mongoose.models.chainData || mongoose.model("ChainData", chainDataSchema);

module.exports = ChainData;
