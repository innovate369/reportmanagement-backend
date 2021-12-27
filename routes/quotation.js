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
  editQuotation
} = require("../controllers/quotation");

router.get("/", checkWhiteList, getAllQuotations);
router.get("/quotationsByClient", checkWhiteList, getQuotation);
router.get("/:id", checkWhiteList, getQuotationById);
router.post("/add", addQuotation);
router.put("/update/:id", updateProject);
router.put("/edit/:id", editQuotation);
router.delete("/delete/:id", deleteQuotation);

module.exports = router;
