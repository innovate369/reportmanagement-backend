const express = require("express");
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const { getQuotation, addQuotation, addProject, deleteQuotation } = require("../controllers/quotation");
//const { checkAddQuotation, validate } = require("../middleware/fieldValidator");

router.get("/", checkWhiteList, getQuotation);
router.post("/add", addQuotation)
router.put("/addProject", addProject)
router.delete("/delete/:id", deleteQuotation)

module.exports = router;