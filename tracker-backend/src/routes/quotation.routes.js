const express = require("express");
const router = express.Router();
const quotationController = require("../controllers/quotation.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, quotationController.createQuotation);
router.get("/", auth, quotationController.getQuotations);

module.exports = router;
