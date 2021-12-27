const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const db = require('../config/db');

const profileSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  gstNum: { type: String, required: true },
  contactNum: { type: String, required: true },
  email: { type: String, required: true },
  bankName: String,
  ifsc: String,
  ownerName: String,
  bankType: String,
  accountNum: String,
  panNum: String,
  logo: Buffer,
  logoName: String
}, { collection: 'Profile' })

const Profile = db.model('Profile', profileSchema);
profileSchema.plugin(aggregatePaginate);

module.exports = Profile;
