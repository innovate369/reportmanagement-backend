const Works = require("../models/work");

const getAllWorks = async (req, res) => {
  try {
    const result = await Works.find({ isNewWork: true });
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
      developmentCost
    } = req.body;

    const newWork = {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost
    };

    const workDetails = await Works.create(newWork);

    res.send({
      msg: "Work added successfully!",
      data: workDetails,
      status: 200
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
      developmentCost
    } = req.body;
    const result = await Works.findByIdAndUpdate(workId, {
      clientId,
      workDescription,
      deliveryDate,
      withExtra,
      developmentTime,
      developmentCost
    });

    res.send({
      msg: "Work updated successfully!",
      data: result,
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

const deleteWork = async (req, res) => {
  try {
    const { workId } = req.query;
    const workTodelete = JSON.parse(workId);
    const deleteById = await Works.deleteMany({ _id: { $in: workTodelete } });
    res.send({
      msg: "Work deleted successfully!",
      data: deleteById,
      status: 200
    });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
};

module.exports = {
  addWork,
  getAllWorks,
  deleteWork,
  updateWork
};
