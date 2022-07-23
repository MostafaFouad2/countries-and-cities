
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("auth/signup", controller.signup);
router.put("/auth/:id", controller.upUser);

module.exports = router;