const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: String,
  description: String,

  owner_id: String,
  owner_name: String,

  //borrower_id : String,
  borrower_name: String,

  status: {
    type: String,
    enum: ["borrowed", "returned", "deleted"],
  },

  created_at: Date,
  modified_at: Date,
});

module.exports = mongoose.model("asset", assetSchema);
