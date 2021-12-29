const express = require('express');
const router = express.Router();

const {
  getProfile,
  updateProfile,
  deleteProfile,
  addProfile
} = require('../controllers/profile')

const { fileStore } = require("../middleware/upload");

router.get('/', getProfile)
router.post('/add', fileStore.fields([{ name: 'logo', maxCount: 1 }]), addProfile)
router.delete('/delete/:id', deleteProfile)
router.put('/edit/:id', updateProfile)

module.exports = router;
