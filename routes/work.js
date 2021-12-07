const express = require("express");

const router = express.Router();
//const checkWhiteList = require('../middleware/check');

const {
  addWork,
  //getWorkWithClientId,
  getAllWorks,
  //addNewWork,
  updateWork,
  deleteWork,
} = require("../controllers/work");

router.get("/", getAllWorks);
//router.get('/workWithClientId',getWorkWithClientId);
router.post("/add", addWork);
router.put("/update", updateWork);
router.delete("/delete", deleteWork);

module.exports = router;