const Clients = require("../models/clients");
const Users = require("../models/users");
const projects = require("../models/projects");
const Quotation = require("../models/quotation");

const recordCount = async (req, res) => {
   const countArray = [];
    try {
        const clientNum = await Clients.countDocuments();
        countArray.push(clientNum)
        const userNum = await Users.countDocuments();
        countArray.push(userNum)
        const projectNum = await projects.countDocuments();
        countArray.push(projectNum)
        const pendingQuotations = await Quotation.countDocuments({ QuotationStatus: "pending" });
        countArray.push(pendingQuotations)
        const approvedQuotations = await Quotation.countDocuments({ QuotationStatus: "approved" });
        countArray.push(approvedQuotations)
        res.send({ msg: 'counts got successfully', 
                data:
                 { 
                     totalClients: countArray[0],
                     totalUsers: countArray[1], 
                     totalProjects: countArray[2],
                     pendingQuotations: countArray[2],
                     approvedQuotations: countArray[3]
                 }, status: 200 })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    recordCount
};
