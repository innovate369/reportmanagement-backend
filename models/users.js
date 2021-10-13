const db = require("../config/db")

const userSchema = new db.Schema({
    email: String,
    password: String
   }, {collection: "users"});
   
const Users = db.model("Users", userSchema);

module.exports = Users;