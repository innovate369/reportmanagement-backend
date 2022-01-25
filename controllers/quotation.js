const Clients = require("../models/clients");
const Quotation = require("../models/quotation");
const Projects = require("../models/projects");
const Works = require('../models/work');
const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.API_KEY;

sgMail.setApiKey(API_KEY);

const getAllQuotations = async (req, res) => {
  try {
    const { search, page, size } = req.query;
    const limit = parseInt(size, 10);
    const skip = (page - 1) * size;

    const totalResults = await Quotation.find({
      $or: [{ invoiceBy: { $regex: search, $options: "i" } }]
    });

    const result = await Quotation.find({
      $or: [{ invoiceBy: { $regex: search, $options: "i" } }]
    })
      .populate("clientId")
      .sort({ createdOn: -1 })
      .limit(limit)
      .skip(skip);

    const totalCount = Math.ceil(totalResults.length / size);

    res.send({
      msg: "Got all Quotations successfully!",
      data: { result, totalCount },
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};
const getQuotation = async (req, res) => {
  try {
    const { clientId } = req.query;
    const quotation = await Quotation.findOne({ clientId: clientId }).populate(
      "workId projectId"
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
    const tds = 0.10 * subCost;

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
        tds
      },
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotationById = await Quotation.findById(id).populate('workId clientId');

    res.send({
      msg: "Successfully got Quotation data",
      data: { quotationById },
      status: 200
    });

  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addQuotation = async (req, res) => {
  try {
    
    let invoiceNum;
    const quotationCount = await Quotation.countDocuments(); 

    if (quotationCount == 0) {
      invoiceNum = 1;
     
    } 
    
    const {
      clientId,
      invoiceBy,
      invoiceType,
      quotationDate,
      workId,
      cGST,
      sGST,
      iGST,
      tds,
      invoiceAmount,
      subCost,
      projectId,
      projectName
    } = req.body;

    // if (quotationCount > 0) {
        
    //   const lastQuotation = await Quotation.find().sort({ createdOn: -1 }).limit(1);
    //   const previousYear = lastQuotation[0].quotationDate.getFullYear();
       
    //   const lastYear = parseInt(previousYear)
    //  const isoDate = new Date(quotationDate).toISOString()
    
    //   const thisYear = isoDate.slice(0, 4);
    //   const currentYear = parseInt(thisYear);
    
    //         if (currentYear > lastYear) {
    //           invoiceNum = 1;
    //         } else {
    //           invoiceNum = lastQuotation[0].invoiceNum + 1;
    //         }
    //   }

    const newQuotation = {
      clientId,
      invoiceBy,
      invoiceType,
      quotationDate,
      cGST,
      sGST,
      iGST,
      tds,
      invoiceAmount,
      subCost,
      workId,
      projectId,
      invoiceNum,
      projectName
    };
    const addNewQuotation = await Quotation.create(newQuotation);
  
    // const addWorkToProject = await Projects.findByIdAndUpdate(projectId, {
    //   $addToSet: { workId: workId }
    // });
  
    // const updateWork = await Works.updateMany(
    //   { _id: { $in: workId } },
    //   { $set: { isNewWork: false } },
    //   { multi: true }
    // )
  
    res.send({
      msg: "Quotation added successfully!",
      data: addNewQuotation,
      status: 200
    });
    
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message, status: 400 });
  }
}
  
const editQuotation = async (req, res) => {
  const { id } = req.params;
  const updateById = await Quotation.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true
  });
  res.send({
    msg: "Quotation updated successfully!",
    data: updateById,
    status: 200
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
          "workId.$.deliveryDate": deliveryDate
        }
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
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const quotationStatus = async (req, res) => {
  try {
 
    const { quotationStatus, id } = req.query;
    if (quotationStatus === "approved") {
      const updateQuotation = await Quotation.findByIdAndUpdate({ _id: id }, { $set: { quotationStatus: "approved" } }, {
        runValidator: true,
        new: true
      })
      const clientId = updateQuotation.clientId;

      const quotationClient = await Clients.findOne({_id : clientId});

      const clientEmail = quotationClient.email;

      const emailMessage = {
        to: clientEmail,
        from: {
          name: 'Innovate 369',
          email: 'milankumarpatel1992@gmail.com'
        },
        subject: 'Quotation Status',
        text: 'Your quotation was approved',
        html: '<h1>Your Quotation Status: APPROVED</h1>',
      };

      sgMail
      .send(emailMessage)
      .then((response) => console.log('Email sent...'))
      .catch((error) => console.log(error.message));
      res.send({
        msg: "Quotation approved!",
        data: updateQuotation,
        status: 200
      });
    } else {
      const updateQuotation = await Quotation.findByIdAndUpdate({ _id: id }, { $set: { quotationStatus: "rejected" } }, {
        runValidator: true,
        new: true
      })

      const clientId = updateQuotation.clientId;

      const quotationClient = await Clients.findOne({_id : clientId});

      const clientEmail = quotationClient.email;

      const emailMessage = {
        to: clientEmail,
        from: {
          name: 'Innovate 369',
          email: 'milankumarpatel1992@gmail.com'
        },
        subject: 'Quotation Status',
        text: 'Your quotation was rejected',
        html: '<h1>Your Quotation Status: REJECTED</h1>',
      };

      sgMail
      .send(emailMessage)
      .then((response) => console.log('Email sent...'))
      .catch((error) => console.log(error.message));
      res.send({
        msg: "Quotation rejected!",
        data: updateQuotation,
        status: 200
      });
    }
  } catch (error) {
    res.send({
      msg: error.msg,
      status: 400
    })
  }
}

module.exports = {
  getAllQuotations,
  getQuotation,
  addQuotation,
  deleteQuotation,
  updateProject,
  getQuotationById,
  editQuotation,
  quotationStatus
}