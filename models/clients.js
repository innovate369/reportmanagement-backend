const mongoose = require("mongoose");
const db = require("../config/db")

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const clientSchema = new mongoose.Schema({
    businessCategory: String,
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Projects"},
    companyName: String,
    ledgerName: String,
    mobileNum: String,
    contactNum: String,
    address: String,
    countryName: String,
    stateName: String,
    cityName: String,
    pinCode: String,
    createdOn: {type: Date, default: Date.now}
   }, {collection: "Clients"});


const Clients = db.model("Clients", clientSchema);
clientSchema.plugin(aggregatePaginate);

module.exports = Clients;