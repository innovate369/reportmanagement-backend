const mongoose = require('mongoose')
const db = require('../config/db')

const { Schema } = mongoose

const workSchema = new Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  //  task: [{
  workDescription: String,
  developmentTime: String,
  developmentCost: Number,
  deliveryDate: { type: Date, default: Date.now },
  withExtra: String
  // }]
}, { collection: 'Works' })

const Works = db.model('Works', workSchema)

module.exports = Works
