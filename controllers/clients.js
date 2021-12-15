/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
const Clients = require("../models/clients");

const getAllClients = async (req, res) => {
  try {
    const { page, size = 10, search, type } = req.query;
    const limit = parseInt(size, 10);
    const skip = (page - 1) * size;

    const totalResults = await Clients.find();
    const totalCount = totalResults.length;

    if (type === "lead") {
      const result = await Clients.find({
        type: type,
        $or: [
          { businessCategory: { $regex: search, $options: "i" } },
          { companyName: { $regex: search, $options: "i" } },
          { ledgerName: { $regex: search, $options: "i" } },
          { ownerName: { $regex: search, $options: "i" } },
          { contactPerson: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
        .limit(limit)
        .skip(skip)
        .sort("createdOn");
      res.send({
        msg: "Got all Clients succuessfully!",
        data: { result, totalCount },
        status: 200,
      });
    } else {
      const result = await Clients.find({
        $or: [
          { businessCategory: { $regex: search, $options: "i" } },
          { companyName: { $regex: search, $options: "i" } },
          { ledgerName: { $regex: search, $options: "i" } },
          { ownerName: { $regex: search, $options: "i" } },
          { contactPerson: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
        .limit(limit)
        .skip(skip)
        .sort("createdOn");
      res.send({
        msg: "Got all Clients succuessfully!",
        data: { result, totalCount },
        status: 200,
      });
    }
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const clientData = async (req, res) => {
  try {
    const clients = await Clients.find().populate("projects");
    res.send({
      msg: "Got all Clients succuessfully!",
      data: clients,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const clientById = await Clients.findById(id).populate("projects");
    res.send({
      msg: "Successfully got client data",
      data: clientById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addClient = async (req, res) => {
  const {
    businessCategory,
    companyName,
    ownerName,
    ledgerName,
    ledgerCode,
    contactPerson,
    gstNum,
    mobileNum,
    contactNum,
    address,
    email,
    countryName,
    stateName,
    cityName,
    pinCode,
    projectId,
  } = req.body;
  const newClient = {
    businessCategory,
    companyName,
    ledgerName,
    mobileNum,
    contactNum,
    address,
    countryName,
    stateName,
    cityName,
    pinCode,
    projectId,
    ownerName,
    ledgerCode,
    contactPerson,
    gstNum,
    email,
  };
  const addNewClient = await Clients.create(newClient);
  res.send({
    msg: "New Client added succesfully!",
    data: addNewClient,
    status: 200,
  });
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Clients.findByIdAndDelete(id);
    res.send({
      msg: "Client data deleted successfully!",
      data: deleteById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const clientInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Clients.findById(id).populate("projectId workId");

    res.send(project.projectId, project.workId);
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const bindProject = async (req, res) => {
  try {
    const { clientId } = req.query;
    const { newProjectId } = req.body;
    const bindingClient = await Clients.findByIdAndUpdate(
      clientId,
      { projectId: newProjectId },
      { runValidator: true, new: true }
    );
    res.send({
      msg: "Client linked with new project!",
      data: bindingClient,
      status: 200,
    });
  } catch (error) {
    res.send({ msg: error.message, status: 400 });
  }
};
const updateClient = async (req, res) => {
  const { id } = req.params;
  const updateById = await Clients.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true,
  });
  res.send({
    msg: "Clients data updated succesfully!",
    data: updateById,
    status: 200,
  });
};

module.exports = {
  getAllClients,
  addClient,
  deleteClient,
  clientInvoice,
  bindProject,
  getClientById,
  clientData,
  updateClient,
};
