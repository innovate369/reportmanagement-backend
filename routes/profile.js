/* eslint-disable semi */
/* eslint-disable quotes */
const express = require('express')

const router = express.Router()
// const checkWhiteList = require('../middleware/check')

const {
  getProfile,
  updateProfile,
  deleteProfile,
  addProfile
} = require('../controllers/profile')
// const { checkAddClient, validate } = require('../middleware/fieldValidator')
const { fileStore } = require("../middleware/upload");

router.get('/:id', getProfile)
router.post('/add', fileStore.fields([{ name: 'logo', maxCount: 1 }]), addProfile)
router.delete('/delete/:id', deleteProfile)
router.put('/edit/:id', updateProfile)

module.exports = router
