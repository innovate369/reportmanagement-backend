const mongoose = require('mongoose')
const db = require('../config/db')

const { Schema } = mongoose

const projectSchema = new Schema({
  developerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  workId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Works', unique: true }],
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
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
}, { collection: 'Projects' })

const Projects = db.model('Projects', projectSchema)

module.exports = Projects
