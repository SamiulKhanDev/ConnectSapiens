const RoomModel = require("../Models/room-model");
class RoomService {
  async create({ topic, roomType, ownerId }) {
    console.log(topic, roomType, ownerId);
    const room = await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }
  async getAllRooms(types) {
    try {
      const rooms = await RoomModel.find({ roomType: { $in: types } })
        .populate("speakers")
        .populate("ownerId")
        .exec();
      return rooms;
    } catch (error) {
      console.log("DAatabase problem");
      // res.json({ message: "Database problem" });
    }
  }
}

module.exports = new RoomService();
