const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const db = require('../config/db')

const invoiceSchema = new mongoose.Schema({
  projectName: String,
  city: String,
  gstNum: String,
  mobileNum: String,
  invoiceNum: String,
  invoiceDate: { type: Date, default: Date.now }
}, { collection: 'Invoices' })

const Invoices = db.model('Invoices', invoiceSchema)
invoiceSchema.plugin(aggregatePaginate)

module.exports = Invoices
