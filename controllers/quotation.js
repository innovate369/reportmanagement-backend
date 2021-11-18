const Quotation = require('../models/quotation');

const getAllQuotations = async (req, res) => {
  try {
    const result = await Quotation.find();
    res.send({ msg: 'Got all successfully!', data: result,  status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
}

const getQuotation = async (req, res) => {
  try {
    const { clientId } = req.query;
    const quotation = await Quotation.findOne({ clientId });

    let subCost = 0;
    for (let i = 0; i < quotation.task.length; i++) {
      const projectCost = await quotation.task[i].developmentCost;
      subCost += projectCost; 
    }

    const withGSTAmount = subCost + (0.18*subCost);
    const withoutGSTAmount = subCost;

    res.send({ msg: 'Quotation got successfully!', data: {quotation, subCost, withGSTAmount, withoutGSTAmount},  status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addQuotation = async (req, res) => {
  const {
    clientId, invoiceBy, invoiceAmount, invoiceType, quotationDate, cGST, iGST, sGST
  } = req.body;
  const newQuotation = {
    clientId, invoiceBy, invoiceAmount, invoiceType, quotationDate, cGST, iGST, sGST
  };
  const addNewQuotation = await Quotation.create(newQuotation);
  res.send({ msg: 'Quotation added successfully!', data: addNewQuotation, status: 200 });
};

const addTask = async (req, res) => {
  const { clientId } = req.query;
  const { workDescription, deliveryDate, withExtra, developmentTime, developmentCost } = req.body;

  const addNewProject = await Quotation.findOneAndUpdate(
    { clientId },
    {
      $push: {
        task: {
          workDescription,
          developmentTime,
          developmentCost,
          deliveryDate,
          withExtra
        }
      },
    },
  );

  res.send({ msg: 'Project added successfully!', data: addNewProject, status: 200 });
};

const updateProject = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { developmentCost, developmentTime, deliveryDate } = req.body;
    const result = await Quotation.updateOne({'task._id': taskId}, {'$set': {
      'task.$.developmentCost': developmentCost, 'task.$.developmentTime': developmentTime, 'task.$.deliveryDate': deliveryDate}})
      res.send({ msg: 'Project updated successfully!', status: 200 })
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
}

const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Quotation.findByIdAndDelete(id);
    res.send({ msg: 'Quotation deleted successfully!', data: deleteById, status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

module.exports = {
  getAllQuotations,
  getQuotation,
  addQuotation,
  addTask,
  deleteQuotation,
  updateProject
};
