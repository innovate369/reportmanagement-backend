const Users = require("../models/users");
const Projects = require("../models/projects");
const bcrypt = require("bcrypt");
const { cookie } = require("cookie");

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
        { phoneNumber: { $regex: search, $options: "i" } }
      ]
    })
      .populate("projectId")
      .select("-password")
      .limit(limit)
      .skip(skip)
      .sort("createdOn");

    res.send({
      msg: "Successfully got all Users!",
      data: { result, totalCount },
      status: 200
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
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addUser = async (req, res) => {
  const { userType, email, userName, phoneNumber } = req.body;
  const newUser = { userType, email, userName, phoneNumber };
  const addUser = await Users.create(newUser);
  res.send({ msg: "New user added successfully!", data: addUser, status: 200 });
};

const regUser = async (req, res) => {
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

  const regUser = new Users({
    userType: req.body.userType,
    email: req.body.email,
    password: hashedPwd,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  });

  const token = await regUser.generateAuthToken();

  res.cookie("regCookie", token, {
    expires: new Date(Date.now() + 30000),
    httpOnly: true
  })

  const registered = await regUser.save();

  res.send({ msg: registered, status: 200 });
};

const userLogin = async (req, res) => {
  try {
    const user = await Users.findOne({
      $or: [{ userName: req.body.userName }, { email: req.body.email }]
    });

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);

      if (cmp) {
        const token = await user.generateAuthToken();
        res.cookie("loginCookie", token, {
          expires: new Date(Date.now() + 30000),
          httpOnly: true
          // secure: true
        })
        await user.save()
        //const userDetails = await Users.find({});
        res.send({
          msg: "Authentication Successful",
          data: user,
          status: 200
        });
      } else {
        res.send({ msg: "Wrong username or password." });
      }
    }
  } catch (error) {
    res.send({ msg: error.message, status: 400 });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateById = await Users.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true
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
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currToken) => {
      return currToken.token !== req.token;
    })
    res.clearCookie("loginCookie");
    await req.user.save();
    res.send({ msg: 'success', status: 200 })
  } catch (error) {
    res.send({ msg: error.msg, status: 400 });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  regUser,
  userLogin,
  userLogout
};
