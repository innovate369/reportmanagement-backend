const mongoose = require("mongoose");
const db = require("../config/db")

const userSchema = new mongoose.Schema({
    userType: String,
    email: String,
    password: String,
    userName: String,
    phoneNumber: String,
    address: String
   }, {collection: "Users"});
   
const Users = db.model("Users", userSchema);

module.exports = Users;