const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const workSchema = new Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    //  task: [{
    workDescription: String,
    developmentTime: String,
    developmentCost: Number,
    deliveryDate: { type: Date, default: Date.now },
    withExtra: String,
    isNewWork: {
      type: Boolean,
      default: true
    }
    // }]
  },
  { collection: "Works" }
);

const Works = db.model("Works", workSchema);

module.exports = Works;
