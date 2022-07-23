const controller = require("../controllers/address.controller");
const express = require("express");
const router = express.Router();

router.post("/address", controller.newAddr);
router.put("/address/:id", controller.upAddress);
router.delete("/address/:id", controller.delAddress);
router.get("/countries", controller.getCountries);
router.get("/countries/:id", controller.getCountriesCities);



module.exports = router;