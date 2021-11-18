const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const db = require('../config/db');

// var Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId;

const quotationSchema = new mongoose.Schema({
  task: [{
    workDescription: String,
    developmentTime: String,
    developmentCost: Number,
    deliveryDate: { type: Date, default: Date.now },
    withExtra: String,
  }],
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients'},
  subCost: String,
  cGST: {type: Number, default: 9},
  sGST: {type: Number, default: 9},
  iGST: {type: Number, default: 18},
  invoiceDate: { type: Date, default: Date.now },
  invoiceBy: String,
  invoiceAmount: Number,
  invoiceType: String
}, { collection: 'Quotation' });

const Quotation = db.model('Quotation', quotationSchema);


quotationSchema.plugin(aggregatePaginate);

module.exports = Quotation;
