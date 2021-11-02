//const { upload } = require("../middleware/upload");
const Users = require("../models/users");
const Projects = require("../models/projects");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async (req, res) => {
    try {
        const { page, size = 10, search, type } = req.query;
        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const result = await Users.find({
            $and: [{
                $or: [{ email: { $regex: search, $options: 'i' } }, { userName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } },
                { userType: { $regex: search, $options: 'i' } }, { firstName: { $regex: search, $options: 'i' } }, { phoneNumber: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } }]
            },
            { userType: type }]
        }).populate('projectId').select("-password").limit(limit).skip(skip).sort('createdOn');
        res.send({ msg: "Successfully got all Users!", data: result, status: 200 })

    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await Users.findById(id).populate('projectId')
        res.send({ msg: "Successfully got user data", data: userById, status: 200 })
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const addUser = async (req, res) => {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const { userType, email, userName, phoneNumber, address, firstName, lastName } = req.body;
        let newUser = { userType, email, password: hashedPwd, userName, phoneNumber, address, firstName, lastName }
        const addUser = await Users.create(newUser);
        res.send({ msg: "New user added successfully!", data: addUser, status: 200 });
    } 

const regUser = async (req, res) => {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const { userType, email, userName, phoneNumber, address, firstName, lastName } = req.body;
        let regUser = { userType, email, password: hashedPwd, userName, phoneNumber, address, firstName, lastName }
        const insertResult = await Users.create(regUser);
        res.send({ msg: insertResult, status: 200 });
    }

const userLogin = async (req, res) => {
        const user = await Users.findOne({ userName: req.body.userName });
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if (cmp) {
                    const projectList = await Projects.find({})
                    res.send({ msg: "Authentication Successful", data: projectList, status: 200 });
                
            } else {
                res.send({ msg: "Wrong username or password." });
            }
        }
    } 
const updateUser = async (req, res) => {
        const { id } = req.params;
        const updateById = await Users.findByIdAndUpdate(id, req.body, { runValidator: true, new: true })
        res.send({ msg: "User updated succesfully!", data: updateById, status: 200 })
    } 

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteById = await Users.findByIdAndDelete(id)
        res.send({ msg: "User deleted successfully!", data: deleteById, status: 200 })
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const bindProject = async (req, res) => {
    try {
        const {userId} = req.query;
        const {newProjectId} = req.body;
        const bindingUser = await Users.findByIdAndUpdate(userId, {projectId: newProjectId}, { runValidator: true, new: true }) 
        res.send({ msg: "User linked with new project!", data: bindingUser, status: 200 });
    } catch (error) {
        res.send({ msg: error.message, status: 400 });
    }
}

const fileUpload = (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
};

module.exports = {
    getAllUsers, getUserById, addUser, updateUser, deleteUser, fileUpload, regUser, userLogin, bindProject
};
