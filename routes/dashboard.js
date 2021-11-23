const express = require('express')

const router = express.Router()
const checkWhiteList = require('../middleware/check')
const { recordCount } = require('../controllers/dashboard')

router.get('/', checkWhiteList, recordCount)

module.exports = router
