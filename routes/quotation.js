const express = require('express');

const router = express.Router();
const checkWhiteList = require('../middleware/check');

const {
  getQuotation, addQuotation, addTask, deleteQuotation, getAllQuotations, updateProject
} = require('../controllers/quotation');
// const { checkAddQuotation, validate } = require("../middleware/fieldValidator");

router.get('/', checkWhiteList, getAllQuotations);
router.get('/quotationsByClient', checkWhiteList, getQuotation);
router.post('/add', addQuotation);
router.put('/addTask', addTask);
router.put('/update', updateProject);
router.delete('/delete/:id', deleteQuotation);

module.exports = router;
