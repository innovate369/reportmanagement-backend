const mongoose = require("mongoose");
const db = require("../config/db")

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const clientSchema = new mongoose.Schema({
    clientName: String,
    projectName: String,
    projectDescription: String,
    projectDetails: String,
    clientStatus: String,
    feedback: String,
    createdOn: {type: Date, default: Date.now}
   }, {collection: "Clients"});


const Clients = db.model("Clients", clientSchema);
clientSchema.plugin(aggregatePaginate);

module.exports = Clients;