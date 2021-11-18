const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const db = require('../config/db');

const clientSchema = new mongoose.Schema({
  businessCategory: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  companyName: String,
  ownerName: String,
  contactPerson: String,
  ledgerName: String,
  ledgerCode: String,
  mobileNum: String,
  contactNum: String,
  gstNum: String,
  address: String,
  email: String,
  countryName: String,
  stateName: String,
  cityName: String,
  pinCode: String,
  createdOn: { type: Date, default: Date.now },
}, { collection: 'Clients' });

const Clients = db.model('Clients', clientSchema);
clientSchema.plugin(aggregatePaginate);

module.exports = Clients;
