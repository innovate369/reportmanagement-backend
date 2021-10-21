const mongoose = require("mongoose");
const db = require("../config/db")

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
    developerId: Array,
    clientId: ObjectId,
    technologies: Array,
    credentials: String,
    details: String,
    duration: String,
    projectName: String,
    startDate: Date,
    createdOn: { type: Date, default: Date.now },
    image: Buffer,
    upload: String
}, { collection: "projects" });

const projects = db.model("projects", projectSchema);

module.exports = projects;