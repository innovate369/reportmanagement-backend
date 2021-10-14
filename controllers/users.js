const Users = require("../models/users");

const getAllUsers = async(req, res) => {
    const allUsers = await Users.find({});
    res.send({msg: "get all users", data: allUsers, status: 200})
}


const getUserById = async(req, res) => {
    const {id} = req.params;
    const userById = await Users.findById(id)
    res.send({msg: "get user by id", data: userById, status: 200})
}

const addUser = async(req, res) => {
    const {userType, email, password, userName, phoneNumber, address} = req.body;
    let newUser = {userType: userType, email: email, password: password, userName: userName, phoneNumber: phoneNumber, address: address}
    const addUser = await Users.create(newUser);
    res.send({msg: "user added", data: addUser, status: 200});
}

module.exports = {
    getAllUsers, getUserById, addUser
};
