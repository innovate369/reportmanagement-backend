const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const db = require('../config/db')

const userSchema = new mongoose.Schema({
  userType: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userName: String,
  phoneNumber: String,
  address: String,
  createdOn: { type: Date, default: Date.now }
}, { collection: 'Users' })

const Users = db.model('Users', userSchema)

userSchema.plugin(aggregatePaginate)

module.exports = Users
