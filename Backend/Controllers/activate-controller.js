const jimp = require("jimp");
const path = require("path");
const { userService } = require("../Services/user-service");
class ActivateController {
  async activate(req, res) {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      return res.status(400).json({ error: "all fields are required" });
    }
    // console.log(req.body);
    // we have to convert base64 to node buffer. But we dont need the front part.
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
      "base64"
    ); //will conver the base64 to buffer
    //now we don't have store large files, will use "jimp" package to compress the photo.
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // 32478362874-3242342342343432.png

    try {
      const jimpRes = await jimp.read(buffer); //compressing the given photo.
      jimpRes
        .resize(150, jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`)); //[with in px, height auto so image dose nor streach],will store the image to the path;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    const id = req.user._id;
    try {
      const user = await userService.findUser({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.activated = true;
      user.name = name;
      user.avatar = `${process.env.BASE_URL}/storage/${imagePath}`;
      user.save();
      res.json({ user, auth: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

const activateController = new ActivateController();
module.exports = { activateController };
