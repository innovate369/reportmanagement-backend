const mongoose = require("mongoose");
const db = require("../config/db")

// var Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId;

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const quotationSchema = new mongoose.Schema({
    projectName: String,
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Clients'},
    developementTime: String,
    developementCost: Number,
    totalCost: Number,
    createdOn: {type: Date, default: Date.now}
   }, {collection: "Quotation"});


  

const Quotation = db.model("Quotation", quotationSchema);

quotationSchema.plugin(aggregatePaginate);

module.exports = Quotation;