const express = require("express");
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const {
  getQuotation,
  addQuotation,
  deleteQuotation,
  getAllQuotations,
  updateProject,
  getQuotationById,
  editQuotation,
  quotationStatus
} = require("../controllers/quotation");

const { validate, checkAddQuotation } = require("../middleware/fieldValidator")

router.get("/", checkWhiteList, getAllQuotations);
router.get("/quotationsByClient", checkWhiteList, getQuotation);
router.get("/:id", checkWhiteList, getQuotationById);
router.post("/add", checkAddQuotation, validate, addQuotation);
router.put("/update/:id", updateProject);
router.put("/edit/:id", editQuotation);
router.delete("/delete/:id", deleteQuotation);
router.put('/quotationStatus', quotationStatus)

module.exports = router;
