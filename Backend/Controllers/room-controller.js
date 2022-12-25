const roomService = require("../Services/room-service");
class RoomsController {
  async create(req, res) {
    const { topic, roomType } = req.body;
    console.log(topic, roomType, "5");
    if (!topic || !roomType)
      return res.status(400).json({ message: "all fields are required" });

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    return res.json(room);
  }

  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open"]);
    // console.log(rooms);
    return res.status(200).json(rooms);
  }

  async getRoom(req, res) {
    const { roomId } = req.body;

    const data = await roomService.getSingleRoom(roomId);
    return res.status(200).json(data);
    // console.log(roomId + " i am here");
  }

  async getRoomsByName(req, res) {
    const { searchRoom } = req.body;
    const data = await roomService.getRoomsByName(searchRoom);
    return res.status(200).json(data);
  }
}

module.exports = new RoomsController();
