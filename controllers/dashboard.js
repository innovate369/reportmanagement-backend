const Clients = require("../models/clients");
const Users = require("../models/users");
const projects = require("../models/projects");

const recordCount = async (req, res) => {
   const countArray = [];
    try {
        const clientNum = await Clients.countDocuments();
        countArray.push(clientNum)
        const userNum = await Users.countDocuments();
        countArray.push(userNum)
        const projectNum = await projects.countDocuments();
        countArray.push(projectNum)
        res.render('adminDesktop', { totalClients: countArray[0], totalUsers: countArray[1], totalProjects: countArray[2] })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    recordCount
};
