const router = require("express").Router();
const locationController = require("../controllers/location.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/save", auth, locationController.recordLocation);

module.exports = router;
