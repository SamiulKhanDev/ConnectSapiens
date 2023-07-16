const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    identifier: { type: String, required: true },
    avatar: { type: String, required: false },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true, //adding timestamp, like when the doc was added or updated.
  }
);

module.exports = mongoose.model("User", userSchema, "users"); //[modelName,from which schema , collection name inside db];
