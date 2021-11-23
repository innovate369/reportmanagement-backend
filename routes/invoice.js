const express = require('express')

const router = express.Router()
const checkWhiteList = require('../middleware/check')

const {
  getAllInvoices, addInvoice, deleteInvoice
} = require('../controllers/invoice')
// const { checkAddQuotation, validate } = require("../middleware/fieldValidator");

router.get('/', checkWhiteList, getAllInvoices)
router.post('/add', checkWhiteList, addInvoice)
router.delete('/delete/:id', checkWhiteList, deleteInvoice)

module.exports = router
