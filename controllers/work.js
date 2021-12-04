const Works = require("../models/work");

const getAllWorks = async (req, res) => {
  try {
    const result = await Works.find();
    res.send({ msg: "Got all Works successfully!", data: result, status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const addWork = async (req, res) => {
  try {
    const {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost,
    } = req.body;
    const newWork = {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost,
    };
    const workDetails = await Works.create(newWork);
    // const obj = JSON.parse(JSON.stringify(workDetails))

    // obj["task"].push({
    //     workDescription: workDescription, deliveryDate: deliveryDate, withExtra: withExtra, developmentTime: developmentTime,
    //     developmentCost: developmentCost
    // });

    // const pushDetails = await Works.findByIdAndUpdate(workDetails._id, {$push : { "task":
    //    { "workDescription": workDescription, deliveryDate: deliveryDate, withExtra: withExtra, developmentTime: developmentTime,
    //     developmentCost: developmentCost}
    // }})

    res.send({
      msg: "Quotation added successfully!",
      data: workDetails,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const updateWork = async (req, res) => {
  try {
    const { workId } = req.query;
    const {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost,
    } = req.body;
    const result = await Works.findByIdAndUpdate(workId, {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost,
    });
    res.send({
      msg: "Project updated successfully!",
      data: result,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

// const addNewWork = async (req, res) => {
//     const { workId } = req.query;
//     const { workDescription, deliveryDate, withExtra, developmentTime, developmentCost } = req.body;

//     const addNewWork = await Works.findByIdAndUpdate(workId,
//         {
//             $push: {
//                 "task": {
//                     workDescription,
//                     developmentTime,
//                     developmentCost,
//                     deliveryDate,
//                     withExtra
//                 }
//             },
//         },
//     );

//     const updatedList = await Works.findById(workId)

//     let subCost = 0;
//     for (let i = 0; i < updatedList.task.length; i++) {
//       const projectCost = await updatedList.task[i].developmentCost;
//       subCost += projectCost;
//     }
//     res.send({ msg: 'Project added successfully!', data: {addNewWork, subCost},  status: 200 });
// };

// const getWorkWithClientId = async (req, res) => {
//     try {
//         const { clientId } = req.query;
//         const work = await Works.findOne({ clientId: clientId });

//         let subCost = 0;
//         for (let i = 0; i < Works.task.length; i++) {
//             const projectCost = await Works.task[i].developmentCost;
//             subCost += projectCost;
//         }

//         const withGSTAmount = subCost + (0.18 * subCost);
//         const withoutGSTAmount = subCost;

//         res.send({ msg: 'Works got successfully!', data: { work, subCost, withGSTAmount, withoutGSTAmount }, status: 200 });
//     } catch (e) {
//         res.send({ msg: e.message, status: 400 });
//     }
// };

const deleteWork = async (req, res) => {
  try {
    const { workId } = req.query;
    const workTodelete = JSON.parse(workId);
    const deleteById = await Works.deleteMany({ _id: { $in: workTodelete } });
    res.send({
      msg: "Work deleted successfully!",
      data: deleteById,
      status: 200,
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};
// const deleteWork = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteById = await Works.findByIdAndDelete(id);
//     res.send({
//       msg: "Work deleted successfully!",
//       data: deleteById,
//       status: 200,
//     });
//   } catch (e) {
//     res.send({ msg: e.message, status: 400 });
//   }
// };

module.exports = {
  addWork,
  //getWorkWithClientId,
  getAllWorks,
  //addNewWork,
  deleteWork,
  updateWork,
};
