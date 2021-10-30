const Clients = require("../models/clients");

const getAllClients = async (req, res) => {
    try {
        const { page, size = 5 } = req.query;
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        const search = req.query.search;
        const result = await Clients.find({
            $or: [{ businessCategory: { $regex: search, $options: 'i' } }, { companyName: { $regex: search, $options: 'i' } }, 
            { ledgerName: { $regex: search, $options: 'i' } }]}).limit(limit).skip(skip).sort('createdOn');;
            res.send({ msg: "Got all Clients succuessfully!", data: result, status: 200 });

    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const addClient = async (req, res) => {
        const { businessCategory, companyName, ledgerName, mobileNum, contactNum, address, countryName, stateName, cityName, pinCode, projectId } = req.body;
        let newClient = { businessCategory, companyName, ledgerName, mobileNum, contactNum, address, countryName, stateName, cityName, pinCode, projectId }
        const addClient = await Clients.create(newClient);
        res.send({ msg: "New Client added succesfully!", data: addClient, status: 200 });
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

const clientInvoice = async(req, res) => {
    try{
        const numWeeks = req.query.numWeeks;
        const user = await Clients.findOne({ clientName: req.body.firstName }); 
        const numDays = 5;
        const dayHours = 8;
        const hourRate = 10
        if (user) {
            user.payment = numWeeks*numDays*dayHours*hourRate;
            res.send(user.payment)
        }
    } catch {
        res.send({ msg: e.message, status: 400 });
    }
}

const bindProject = async (req, res) => {
    try {
        const {clientId} = req.query;
        const {newProjectId} = req.body;
        const bindingClient = await Clients.findByIdAndUpdate(clientId, {projectId: newProjectId}, { runValidator: true, new: true }) 
        res.send({ msg: "Client linked with new project!", data: bindingClient, status: 200 });
    } catch (error) {
        res.send({ msg: error.message, status: 400 });
    }
}


module.exports = {
    getAllClients, addClient, deleteClient, clientInvoice, bindProject
};
