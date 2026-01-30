const router = require("express").Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");

// POST /api/user/upload-avatar
router.post("/upload-avatar", auth, upload.single("avatar"), userController.uploadAvatar);

// POST /api/user/update-profile
router.post("/update-profile", auth, userController.updateProfile);

// POST /api/user/delete-account
router.post("/delete-account", auth, userController.deleteAccount);

// POST /api/user/heartbeat - Keep user ONLINE (alternative to socket heartbeat)
router.post("/heartbeat", auth, userController.heartbeat);

// GET /api/user/status - Get current user online status
router.get("/status", auth, userController.getUserStatus);

module.exports = router;