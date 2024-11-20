// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/customerController");

router.get("/", userController.getCustomerList);

module.exports = router;
