const Works = require('../models/work');

const getAllWorks = async (req, res) => {
    try {
      const result = await Works.find();
      res.send({ msg: 'Got all Works successfully!', data: result,  status: 200 });
    } catch (e) {
      res.send({ msg: e.message, status: 400 });
    }
  }

const addWork = async (req, res) => {
    try {
        const { workDescription, deliveryDate, withExtra, developmentTime, developmentCost } = req.body;
          const newWork = {
            workDescription, deliveryDate, withExtra, developmentTime, developmentCost
          };
        const workDetails = await Works.create(newWork);
        res.send({ msg: 'Quotation added successfully!', data: workDetails, status: 200 });
    } catch (e) {
        res.send({ msg: e.message, status: 400 });
    }
}

const addNewWork = async (req, res) => {
    const { workId } = req.query;
    const { workDescription, deliveryDate, withExtra, developmentTime, developmentCost } = req.body;
  
    const addNewWork = await Works.findByIdAndUpdate(workId,
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
  
    res.send({ msg: 'Project added successfully!', data: addNewWork, status: 200 });
  };
  

const getWorkWithClientId = async (req, res) => {
    try {
      const { clientId } = req.query;
      const work = await Works.findOne({ clientId: clientId });
  
      let subCost = 0;
      for (let i = 0; i < quotation.task.length; i++) {
        const projectCost = await quotation.task[i].developmentCost;
        subCost += projectCost; 
      }
  
      const withGSTAmount = subCost + (0.18*subCost);
      const withoutGSTAmount = subCost;
  
      res.send({ msg: 'Works got successfully!', data: {work, subCost, withGSTAmount, withoutGSTAmount},  status: 200 });
    } catch (e) {
      res.send({ msg: e.message, status: 400 });
    }
  };



module.exports = {
 addWork,
 getWorkWithClientId,
 getAllWorks,
 addNewWork
  };