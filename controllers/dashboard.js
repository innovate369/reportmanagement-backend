const Clients = require('../models/clients')
const Users = require('../models/users')
const projects = require('../models/projects')

const recordCount = async (req, res) => {
  try {
    const clientNum = await Clients.countDocuments()
    const userNum = await Users.countDocuments()
    const projectNum = await projects.countDocuments()

    res.render('adminDesktop', { totalClients: clientNum, totalUsers: userNum, totalProjects: projectNum })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  recordCount
}
