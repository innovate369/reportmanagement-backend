const express = require("express");
const router = express.Router();

const {
  addWork,
  getAllWorks,
  updateWork,
  deleteWork
} = require("../controllers/work");

router.get("/", getAllWorks);
router.post("/add", addWork);
router.put("/update", updateWork);
router.delete("/delete", deleteWork);

module.exports = router;
