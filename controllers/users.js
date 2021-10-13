const getAllUsers = (req, res) => {
    res.send({msg: "get all users", data: "", status: 200})
}

module.exports = {
    getAllUsers
};