const mongoose = require('mongoose');

const db = mongoose.connect("mongodb://localhost:27017/reportManagement", {useNewUrlParser: true});
export default db;