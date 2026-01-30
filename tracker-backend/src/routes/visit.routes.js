const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visit.controller");
const auth = require("../middlewares/auth.middleware");

// All routes are protected
router.post("/", auth, visitController.createVisit);
router.get("/", auth, visitController.getVisits);

module.exports = router;
