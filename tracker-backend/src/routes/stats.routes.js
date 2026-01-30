const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/daily", auth, statsController.getDailyStats);

module.exports = router;
