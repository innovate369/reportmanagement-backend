/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable indent */
const mongoose = require("mongoose");
const db = require("../config/db")
const jwt = require("jsonwebtoken");

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new mongoose.Schema({
    userType: String,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
    email: String,
    userName: String,
    password: String,
    phoneNumber: String,
    createdOn: { type: Date, default: Date.now },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
   }, { collection: "Users" });

   userSchema.methods.generateAuthToken = async function () {
       try {
           const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
           this.tokens = this.tokens.concat({ token: token })
           return token;
       } catch (error) {
           res.send({ msg: error.msg, status: 400 })
       }
   }

const Users = db.model("Users", userSchema);

userSchema.plugin(aggregatePaginate);

module.exports = Users;