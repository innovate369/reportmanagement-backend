const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const db = require("../config/db");

const quotationSchema = new mongoose.Schema(
  {
    workId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Works" }],
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
    projectName: String,
    invoiceNum: String,
    subCost: Number,
    cGST: Number,
    sGST: Number,
    iGST: Number,
    quotationDate: { type: Date, default: Date.now },
    invoiceBy: String,
    invoiceAmount: Number,
    invoiceType: { type: Boolean, default: false },
  },
  { collection: "Quotation" }
);

const Quotation = db.model("Quotation", quotationSchema);

quotationSchema.plugin(aggregatePaginate);

module.exports = Quotation;
