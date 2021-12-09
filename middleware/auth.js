/* eslint-disable semi */
/* eslint-disable quotes */
const jwt = require('jsonwebtoken')
const Users = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.loginCookie
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY)

    const user = await Users.findOne({ _id: verifyUser._id });

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.send({ msg: error.message, status: 400 })
  }
}

module.exports = auth
