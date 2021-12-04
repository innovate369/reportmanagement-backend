//const { upload } = require("../middleware/upload");
const Users = require("../models/users");
const Projects = require("../models/projects");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const { page, size = 10, search } = req.query;
    const limit = parseInt(size, 10);

    const skip = (page - 1) * size;

    const totalResults = await Users.find();
    const totalCount = totalResults.length;

    const result = await Users.find({
      $or: [
        { email: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { userType: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ],
    })
      .populate("projectId")
      .select("-password")
      .limit(limit)
      .skip(skip)
      .sort("createdOn");

    res.send({
      msg: "Successfully got all Users!",
      data: { result, totalCount },
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await Users.findById(id).populate("projectId");
    res.send({
      msg: "Successfully got user data",
      data: userById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addUser = async (req, res) => {
  const { userType, email, userName, phoneNumber } = req.body;
  let newUser = { userType, email, userName, phoneNumber };
  const addUser = await Users.create(newUser);
  res.send({ msg: "New user added successfully!", data: addUser, status: 200 });
};

const regUser = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  const {
    userType,
    email,
    userName,
    phoneNumber,
    address,
    firstName,
    lastName,
  } = req.body;
  let regUser = {
    userType,
    email,
    password: hashedPwd,
    userName,
    phoneNumber,
    address,
    firstName,
    lastName,
  };
  const insertResult = await Users.create(regUser);
  res.send({ msg: insertResult, status: 200 });
};

const userLogin = async (req, res) => {
  const user = await Users.findOne({
    $or: [{ userName: req.body.userName }, { email: req.body.email }],
  });
  if (user) {
    const cmp = await bcrypt.compare(req.body.password, user.password);
    if (cmp) {
      const projectList = await Projects.find({});
      res.send({
        msg: "Authentication Successful",
        data: projectList,
        status: 200,
      });
    } else {
      res.send({ msg: "Wrong username or password." });
    }
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateById = await Users.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true,
  });
  res.send({ msg: "User updated succesfully!", data: updateById, status: 200 });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Users.findByIdAndDelete(id);
    res.send({
      msg: "User deleted successfully!",
      data: deleteById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const fileUpload = (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  fileUpload,
  regUser,
  userLogin,
};
