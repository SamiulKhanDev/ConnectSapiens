const router = require("express").Router();
const { authController } = require("./Controllers/auth-controller");
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

module.exports = router;
