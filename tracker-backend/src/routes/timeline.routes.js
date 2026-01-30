const router = require("express").Router();
const timelineController = require("../controllers/timeline.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/segments/:date", auth, timelineController.getTimeline);
router.get("/day/:date", auth, timelineController.getDailyLogs);
router.get("/history", auth, timelineController.getActivityHistory);

module.exports = router;
