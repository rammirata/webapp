const mongoose = require("mongoose");

const refObjectId = mongoose.Schema.Types.ObjectId;

//address request schema
const addressGroupsSchema = mongoose.Schema(
  {
    addresses: [{ type: String }],
    isProcessed: { type: Boolean, default: false },
    requestBy: { type: refObjectId, ref: "User" },
    groupName: { type: String }
  },
  { timestamps: true }
);

let AddressGroups =
  mongoose.models.AddressGroups ||
  mongoose.model("AddressGroups", addressGroupsSchema);

module.exports = AddressGroups;
