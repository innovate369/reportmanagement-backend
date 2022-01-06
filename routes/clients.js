const express = require('express')
const router = express.Router()
const checkWhiteList = require('../middleware/check')

const {
  getAllClients,
  clientData,
  getClientById,
  addClient,
  deleteClient,
  bindProject,
  updateClient,
  leadStatus
} = require('../controllers/clients')

router.get('/', checkWhiteList, getAllClients)
router.get('/clientData', checkWhiteList, clientData)
router.get('/:id', checkWhiteList, getClientById)
router.post('/add', addClient)
router.delete('/delete/:id', deleteClient)
router.put('/bindProject', bindProject)
router.put('/edit/:id', updateClient)
router.put('/leadStatus', leadStatus)

module.exports = router
