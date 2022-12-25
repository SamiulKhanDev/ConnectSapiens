const router = require("express").Router();
const { authController } = require("./Controllers/auth-controller");
const { activateController } = require("./Controllers/activate-controller");
const { validateAccesstoken } = require("./Middleweres/auth-middlewere");
const roomsController = require("./Controllers/room-controller");
// const roomController = require("./Controllers/room-controller");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/api/send-otp", authController.sendOtp); //to send otp in provided number.
router.post("/api/verify-otp", authController.verifyOtp); //to verify if the otp is correct of not.
router.post("/api/activate", validateAccesstoken, activateController.activate); //this route will be private, so valid users who only
// have a valid access token will be able hit it.
//we will do it by creating middleweres. Middlewere are just js function that will decide
// that upon hiting a perticuler route will the controler work or not,if the user is valid the
//activateController will work.All middleweres accepet req, res, next, next is a call back
//fucntion.If allis right then to proced incoke the next();
//validateAccesstoken is a middlewere.

router.get("/api/refresh", authController.refresh);
router.post("/api/logout", validateAccesstoken, authController.logout);
router.post("/api/rooms", validateAccesstoken, roomsController.create);
router.get("/api/rooms", validateAccesstoken, roomsController.index);
router.post("/api/room", validateAccesstoken, roomsController.getRoom);
router.post("/api/roomsByName", validateAccesstoken, roomsController.getRoomsByName);
module.exports = router;
