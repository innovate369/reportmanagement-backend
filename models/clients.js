const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const db = require('../config/db')

const clientSchema = new mongoose.Schema({
  businessCategory: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
  // workId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Works' }],
  companyName: { type: String, required: true },
  ownerName: String,
  contactPerson: String,
  ledgerName: String,
  ledgerCode: String,
  mobileNum: String,
  contactNum: { type: String, required: true },
  gstNum: String,
  address: String,
  email: { type: String, required: true },
  countryName: String,
  projectName: { type: String, required: true },
  stateName: String,
  cityName: String,
  pinCode: String,
  createdOn: { type: Date, default: Date.now },
  type: String,
  status: String,
  rejectionReason: String
}, { collection: 'Clients' })

const Clients = db.model('Clients', clientSchema)
clientSchema.plugin(aggregatePaginate)

module.exports = Clients
