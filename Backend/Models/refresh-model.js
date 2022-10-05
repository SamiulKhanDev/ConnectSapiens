const mongoose = require("mongoose");
const refreshSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //the type of of userId is ObjectId, which is reference of User model.
  },
  {
    timestamps: true, //adding timestamp, like when the doc was added or updated.
  }
);

module.exports = mongoose.model("Refresh", refreshSchema, "tokens"); //[modelName,from which schema , collection name inside db];
