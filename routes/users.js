const express = require('express')
// const cors = require('cors')

const router = express.Router()
const checkWhiteList = require('../middleware/check')

const { fileStore } = require('../middleware/upload')
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  fileUpload,
  regUser,
  userLogin,
  bindProject
} = require('../controllers/users')
const { checkAddUser, checkLoginUser, validate } = require('../middleware/fieldValidator')

router.get('/', checkWhiteList, getAllUsers)
router.get('/:id', getUserById)
router.post('/add', checkAddUser, validate, addUser)
router.put('/update/:id', checkAddUser, validate, updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/upload', fileStore.single('image'), fileUpload)
router.post('/register', checkAddUser, validate, regUser)
router.post('/login', checkLoginUser, validate, userLogin)
router.put('/bindProject', bindProject)

module.exports = router
