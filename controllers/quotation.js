/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Clients = require("../models/clients");
const { update } = require("../models/quotation");
const Quotation = require("../models/quotation");
const Projects = require("../models/projects");
const Works = require('../models/work');

// eslint-disable-next-line no-multi-spaces
// const getAllQuotations = async (req, res) => {
//   // add search functionality
//   try {
//     const result = await Quotation.find({}).populate("clientId");
//     res.send({
//       msg: "Got all Quotations successfully!",
//       data: result,
//       status: 200,
//     });
//   } catch (e) {
//     res.send({ msg: e.message, status: 400 });
//   }
// };

const getAllQuotations = async (req, res) => {
  try {
    const { search, page, size } = req.query;
    const limit = parseInt(size, 10);
    const skip = (page - 1) * size;

    const totalResults = await Quotation.find({
      $or: [{ invoiceBy: { $regex: search, $options: "i" } }],
    });

    const result = await Quotation.find({
      $or: [{ invoiceBy: { $regex: search, $options: "i" } }],
    })
      .populate("clientId")
      .limit(limit)
      .skip(skip);

    const totalCount = Math.ceil(totalResults.length / size);

    res.send({
      msg: "Got all Quotations successfully!",
      data: { result, totalCount },
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};
const getQuotation = async (req, res) => {
  try {
    const { clientId } = req.query;
    const quotation = await Quotation.findOne({ clientId }).populate(
      "clientId workId"
    );
    console.log(quotation.workId.length);

    let subCost = 0;
    for (let i = 0; i < quotation.workId.length; i++) {
      const projectCost = await quotation.workId[i].developmentCost;
      subCost += projectCost;
    }

    const iGST = 0.18 * subCost;
    const cGST = 0.09 * subCost;
    const sGST = 0.09 * subCost;

    const withGSTAmount = subCost + 0.18 * subCost;
    const withoutGSTAmount = subCost;

    res.send({
      msg: "Quotation got successfully!",
      data: {
        quotation,
        subCost,
        withGSTAmount,
        withoutGSTAmount,
        iGST,
        cGST,
        sGST,
      },
      status: 200,
    });
    // res.send({ msg: 'Quotation got successfully!', data: quotation, status: 200 })
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotationById = await Quotation.findById(id).populate("clientId workId");

    res.send({
      msg: "Successfully got Quotation data",
      data: { quotationById },
      status: 200,
    });

  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addQuotation = async (req, res) => {
  const {
    clientId,
    invoiceBy,
    invoiceType,
    quotationDate,
    workId,
    cGST,
    sGST,
    iGST,
    invoiceAmount,
    subCost,
    project,
    projectName
  } = req.body;
  const newQuotation = {
    clientId,
    invoiceBy,
    invoiceType,
    quotationDate,
    cGST,
    sGST,
    iGST,
    invoiceAmount,
    subCost,
    workId,
    project,
    projectName,
    invoiceNum: Math.random().toString(36).slice(2)
  };
  const addNewQuotation = await Quotation.create(newQuotation);

  const addWorkToProject = await Projects.findByIdAndUpdate(project, {
    $push: { workId: workId },
  });

  const updateWork = await Works.updateMany(
    { _id: { $in: workId } },
    { $set: { isNewWork: false } },
    { multi: true }
  )

  // const addWorkToClientWorkId = await Clients.findByIdAndUpdate(clientId, { $push: { workId: workId, 'projectId.workId': workId } })

  // const pushDetails = await Quotation.findByIdAndUpdate(addNewQuotation._id, { $push: { workId: workId } })
  // const updatedQuotaion = await Quotation.findById(addNewQuotation._id)
  // let subCost = 0
  // for (let i = 0; i < updatedQuotaion.workId.length; i++) {
  //   const projectCost = await updatedQuotaion.workId[i].developmentCost
  //   subCost += projectCost
  // }

  // const iGST = 0
  // const cGST = 9
  // const sGST = 9

  // const withGSTAmount = subCost + (0.18 * subCost)
  // const withoutGSTAmount = subCost

  // const readyQuotation = await Quotation.findByIdAndUpdate(updatedQuotaion._id, {
  //   $push: {
  //     iGST,
  //     cGST,
  //     sGST,
  //     withGSTAmount,
  //     withoutGSTAmount
  //   }
  // })

  res.send({
    msg: "Quotation added successfully!",
    data: addNewQuotation,
    status: 200,
  });
};

const editQuotation = async (req, res) => {
  const { id } = req.params;
  const updateById = await Quotation.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true,
  });
  res.send({
    msg: "Quotation updated successfully!",
    data: updateById,
    status: 200,
  });
};

const updateProject = async (req, res) => {
  try {
    const { workId } = req.query;
    const { developmentCost, developmentTime, deliveryDate } = req.body;
    const result = await Quotation.updateOne(
      { "workId._id": workId },
      {
        $set: {
          "workId.$.developmentCost": developmentCost,
          "workId.$.developmentTime": developmentTime,
          "workId.$.deliveryDate": deliveryDate,
        },
      }
    );
    res.send({ msg: "Project updated successfully!", status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Quotation.findByIdAndDelete(id);
    res.send({
      msg: "Quotation deleted successfully!",
      data: deleteById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

module.exports = {
  getAllQuotations,
  getQuotation,
  addQuotation,
  deleteQuotation,
  updateProject,
  getQuotationById,
  editQuotation,
};
