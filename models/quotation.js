const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const db = require('../config/db')

const quotationSchema = new mongoose.Schema({
  workId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Works' }],
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
  projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
  subCost: Number,
  cGST: Number,
  sGST: Number,
  iGST: Number,
  quotationDate: { type: Date, default: Date.now },
  invoiceBy: String,
  invoiceAmount: Number,
  invoiceType: String
}, { collection: 'Quotation' })

const Quotation = db.model('Quotation', quotationSchema)

quotationSchema.plugin(aggregatePaginate)

module.exports = Quotation
