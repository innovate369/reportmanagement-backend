const Users = require("../models/users");

const getAllUsers = async(req, res) => {
    try
    {
        const allUsers = await Users.find({});
        res.send({msg: "Successfully got all users!", data: allUsers, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
    }
}

const getUserById = async(req, res) => {
    try
    {
        const {id} = req.params;
        const userById = await Users.findById(id)
        res.send({msg: "Successfully got user data", data: userById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
                }       
}

const addUser = async(req, res) => {
    try
    {
        const {userType, email, password, userName, phoneNumber, address} = req.body;
        let newUser = {userType: userType, email: email, password: password, userName: userName, phoneNumber: phoneNumber, address: address}
        const addUser = await Users.create(newUser);
        res.send({msg: "New user added succesfully!", data: addUser, status: 200});
    } catch(e) {
        console.log(e)
        res.send({msg: e.message, status: 400})
            }
}

const updateUser = async(req, res) => {
    try
    {
        const {id} = req.params;
        const updateById = await Users.findByIdAndUpdate(id, req.body, {runValidator: true, new: true})
        res.send({msg: "User updated succesfully!", data: updateById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
        }
}

const deleteUser = async(req, res) => {
    try
    {
        const {id} = req.params;
        const deleteById = await Users.findByIdAndDelete(id)
        res.send({msg: "User deleted successfully!", data: deleteById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
        }
}

module.exports = {
    getAllUsers, getUserById, addUser, updateUser, deleteUser
};
