const router = require("express").Router();
const { authController } = require("./Controllers/auth-controller");
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/api/send-otp", authController.sendOtp); //to send otp in provided number.
router.post("/api/verify-otp", authController.verifyOtp); //to verify if the otp is correct of not.

module.exports = router;
