const mongoose = require("mongoose");
const db = require("../config/db")

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
    developerId: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: "Clients"},
    technologies: Array,
    credentials: String,
    details: String,
    duration: String,
    projectName: String,
    startDate: Date,
    createdOn: { type: Date, default: Date.now },
    image: Buffer,
    clientCSV: Buffer,
    csvName: String,
    upload: String
}, { collection: "Projects" });

const Projects = db.model("Projects", projectSchema);

module.exports = Projects;