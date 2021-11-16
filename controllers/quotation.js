const Quotation = require('../models/quotation');

const getQuotation = async (req, res) => {
  try {
    const { clientId } = req.query;
    const quotation = await Quotation.findOne({ clientId });

    let totalCost = 0;
    for (let i = 0; i < quotation.project.length; i++) {
      const projectCost = await quotation.project[i].developementCost;
      totalCost += projectCost; 
    }

    res.send({ msg: 'Quotation got successfully!', data: {quotation, totalCost},  status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addQuotation = async (req, res) => {
  const {
    clientId
  } = req.body;
  const newQuotation = {
    clientId
  };
  const addNewQuotation = await Quotation.create(newQuotation);
  res.send({ msg: 'Quotation added successfully!', data: addNewQuotation, status: 200 });
};

const addProject = async (req, res) => {
  const { clientId } = req.query;
  const { projectName, developementTime, developementCost } = req.body;

  const addNewProject = await Quotation.findOneAndUpdate(
    { clientId },
    {
      $push: {
        project: {
          projectName,
          developementTime,
          developementCost,
        }
      },
    },
  );

 
  
  res.send({ msg: 'Project added successfully!', data: addNewProject, status: 200 });
};

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
  getQuotation,
  addQuotation,
  addProject,
  deleteQuotation,
};
