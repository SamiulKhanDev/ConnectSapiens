const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    roomType: { type: String, required: true },
    owerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //the type of of userId is ObjectId, which is reference of User model.
    speakers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true, //adding timestamp, like when the doc was added or updated.
  }
);

module.exports = mongoose.model("Room", roomSchema, "rooms"); //[modelName,from which schema , collection name inside db];
