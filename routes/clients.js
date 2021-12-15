const express = require('express')

const router = express.Router()
const checkWhiteList = require('../middleware/check')

const {
  getAllClients,
  clientData,
  getClientById,
  addClient,
  deleteClient,
  clientInvoice,
  bindProject,
  updateClient,
  leadStatus
} = require('../controllers/clients')
const { checkAddClient, validate } = require('../middleware/fieldValidator')

router.get('/', checkWhiteList, getAllClients)
router.get('/clientData', checkWhiteList, clientData)
router.get('/:id', checkWhiteList, getClientById)
router.post('/add', checkAddClient, validate, addClient)
router.delete('/delete/:id', deleteClient)
router.get('/invoice/:id', clientInvoice)
router.put('/bindProject', bindProject)
router.put('/edit/:id', updateClient)
router.put('/leadStatus', leadStatus)

module.exports = router
