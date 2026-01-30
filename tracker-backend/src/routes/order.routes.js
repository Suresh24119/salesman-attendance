const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.post("/", auth, upload.single('receipt'), orderController.createOrder);
router.get("/", auth, orderController.getOrders);

module.exports = router;
