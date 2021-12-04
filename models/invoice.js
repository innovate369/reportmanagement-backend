const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const db = require("../config/db");

const invoiceSchema = new mongoose.Schema(
  {
    workId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Works" }],
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
    subCost: Number,
    city: String,
    mobileNum: String,
    cGST: Number,
    sGST: Number,
    iGST: Number,
    quotationDate: { type: Date, default: Date.now },
    invoiceBy: String,
    invoiceAmount: Number,
    invoiceType: String,
  },
  { collection: "Invoices" }
);

const Invoices = db.model("Invoices", invoiceSchema);
invoiceSchema.plugin(aggregatePaginate);

module.exports = Invoices;
