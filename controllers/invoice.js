const Invoice = require('../models/invoice')

const getAllInvoices = async (req, res) => {
  try {
    const getInvoices = await Invoice.find()
    res.send({ msg: 'Got all Invoices successfully!', data: getInvoices, status: 200 })
  } catch (error) {
    res.send({ msg: error.message, status: 400 })
  }
}

const addInvoice = async (req, res) => {
  try {
    const { projectName, city, gstNum, mobileNum, invoiceNum, invoiceDate } = req.body
    const newInvoiceData = { projectName, city, gstNum, mobileNum, invoiceNum, invoiceDate }
    const newInvoice = await Invoice.create(newInvoiceData)
    res.send({ msg: 'Invoice created successfully!', data: newInvoice, status: 200 })
  } catch (error) {
    res.send({ msg: error.message, status: 400 })
  }
}

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params
    const deleteById = await Invoice.findByIdAndDelete(id)
    res.send({ msg: 'Invoice deleted successfully!', data: deleteById, status: 200 })
  } catch (e) {
    res.send({ msg: e.message, status: 400 })
  }
}

module.exports = {
  getAllInvoices,
  addInvoice,
  deleteInvoice
}
