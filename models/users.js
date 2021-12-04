const mongoose = require("mongoose");
const db = require("../config/db")

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new mongoose.Schema({
    userType: String,
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Projects"},
    email: String,
    userName: String,
    phoneNumber: String,
    createdOn: {type: Date, default: Date.now}
   }, {collection: "Users"});


const Users = db.model("Users", userSchema);

userSchema.plugin(aggregatePaginate);

module.exports = Users;