const Quotation = require("../models/quotation");

const getQuotation = async (req, res) => {
    try {
        const { clientId } = req.query;
        const getQuotation = await Quotation.findOne({ clientId: clientId })
        console.log(clientId)
        res.send({ msg: "Quotation got successfully!", data: getQuotation, status: 200 })
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const addQuotation = async (req, res) => {
    const { clientId, developementTime, developementCost, projectName } = req.body;
    let newQuotation = { clientId, developementTime, developementCost, projectName };
    const addQuotation = await Quotation.create(newQuotation);
    res.send({ msg: "Quotation added successfully!", data: addQuotation, status: 200 })
}

const addProject = async (req, res) => {
    const { clientId } = req.query;
    const { projectName, developementTime, developementCost } = req.body;
    
    const addProject = await Quotation.findOneAndUpdate({ clientId: clientId },
        {
            $push: {
                project: {
                    projectName: projectName, developementTime: developementTime,
                    developementCost: developementCost
                }
            }
        }
    );
    // var totalCost = project.reduce(function(prev, cur) {
    //     return prev + cur.developementCost;
    //   }, 0);

    res.send({ msg: "Project added successfully!", data: addProject, status: 200 })
}

const deleteQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteById = await Quotation.findByIdAndDelete(id)
        res.send({ msg: "Quotation deleted successfully!", data: deleteById, status: 200 })
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

module.exports = {
    getQuotation,
    addQuotation,
    addProject,
    deleteQuotation
};