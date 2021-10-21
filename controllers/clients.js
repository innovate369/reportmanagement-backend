const Clients = require("../models/clients");


const getAllClients = async (req, res) => {
    try {
        const search = req.query.search;
        const result = await Clients.find({
            $or: [{ clientName: { $regex: search, $options: 'i' } }, { projectName: { $regex: search, $options: 'i' } }, { projectDescription: { $regex: search, $options: 'i' } },
            { projectDetails: { $regex: search, $options: 'i' } }, { clientStatus: { $regex: search, $options: 'i' } }, { feedback: { $regex: search, $options: 'i' } }]
        });
        res.send(result)

    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const addClient = async (req, res) => {
    try {
        const { clientName, projectName, projectDescription, projectDetails, clientStatus, feedback } = req.body;
        let newClient = { clientName: clientName, projectName: projectName, projectDescription: projectDescription, projectDetails: projectDetails, clientStatus: clientStatus, feedback: feedback }
        const addClient = await Clients.create(newClient);
        res.send({ msg: "New Client added succesfully!", data: addClient, status: 200 });
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteById = await Clients.findByIdAndDelete(id)
        res.send({ msg: "Client data deleted successfully!", data: deleteById, status: 200 })
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

module.exports = {
    getAllClients, addClient, deleteClient
};
