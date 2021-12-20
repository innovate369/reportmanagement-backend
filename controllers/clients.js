/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
const Clients = require("../models/clients");

const getAllClients = async (req, res) => {
  try {
    const { page, size = 10, search, type } = req.query;
    const limit = parseInt(size, 10);
    const skip = (page - 1) * size;

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
      const totalLeads = await Clients.find({ type: type })
      const totalCount = totalLeads.length;
      res.send({
        msg: "Got all leads succuessfully!",
        data: { result, totalCount },
        status: 200,
      });
    } else {
      const result = await Clients.find({
        type: { $ne: "lead" },
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
      const totalClients = await Clients.find({ type: { $ne: "lead" } })
      const totalCount = totalClients.length;
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
    companyName,
    ownerName,
    contactNum,
    address,
    email,
    projectName,
    status
  } = req.body;
  const newClient = {
    companyName,
    ownerName,
    contactNum,
    address,
    email,
    projectName,
    status
  };
  const addNewClient = await Clients.create(newClient);
  res.send({
    msg: "New client/lead is added succesfully!",
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

const leadStatus = async (req, res) => {
  try {
    const { accepted, id } = req.query;
    const { rejectionReason, businessCategory, ownerName, contactPerson, ledgerName, ledgerCode, mobileNum, contactNum,  } = req.body;
    if (accepted === "true") {
      const updateLead = await Clients.findByIdAndUpdate({ _id: id }, { $set: {} }, $unset: { rejectionReason: "" } }, {
        runValidator: true,
        new: true,
      })


      res.send({
        msg: "Lead approved!",
        data: updateLead,
        status: 200,
      });
    } else {
      const updateLead = await Clients.findByIdAndUpdate({ _id: id }, { $set: { type: "lead", status: "rejected", rejectionReason: rejectionReason } }, {
        runValidator: true,
        new: true,
      })
      res.send({
        msg: "Lead rejected!",
        data: updateLead,
        status: 200,
      });
    }
  } catch (error) {
    res.send({
      msg: error.msg,
      status: 400,
    })
  }
}

module.exports = {
  getAllClients,
  addClient,
  deleteClient,
  clientInvoice,
  bindProject,
  getClientById,
  clientData,
  updateClient,
  leadStatus
};
