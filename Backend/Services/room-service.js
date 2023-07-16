const RoomModel = require("../Models/room-model");
class RoomService {
  async create({ topic, roomType, ownerId }) {
    // console.log(topic, roomType, ownerId);
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
  async getSingleRoom(roomId) {
    try {
      const data = await RoomModel.findOne({ _id: roomId });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getRoomsByName(roomName) {
    try {
      const data = await RoomModel.find({
        topic: { $regex: roomName, $options: "i" }, //all the rooms that have "roomName"(case Insensitive)in them
      })
        .populate("speakers")
        .populate("ownerId")
        .exec();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new RoomService();
