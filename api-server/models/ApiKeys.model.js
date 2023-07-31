const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: [true, 'Cannot proceed without an API key']
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

const ApiKey =
  mongoose.models.apiKey || mongoose.model("ApiKey", apiKeySchema);

module.exports = ApiKey;
