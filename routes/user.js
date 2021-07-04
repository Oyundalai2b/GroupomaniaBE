const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/update-profile", auth, userCtrl.getProfile);
router.put("/update-profile", auth, userCtrl.updateProfile);
router.put("/change-password", auth, userCtrl.changePassword);
router.delete("/delete-profile", auth, userCtrl.deleteProfile);

module.exports = router;
