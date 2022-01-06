const express = require("express");
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const {
  getAllInvoices,
  addInvoice,
  deleteInvoice,
  addWork
} = require("../controllers/invoice");

router.get("/", checkWhiteList, getAllInvoices);
router.post("/add", addInvoice);
router.post("/addWork", addWork);
router.delete("/delete/:id", checkWhiteList, deleteInvoice);

module.exports = router;
