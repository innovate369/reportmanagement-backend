const Projects = require("../models/projects");
const Clients = require("../models/clients");
const { fileStore } = require("../middleware/upload");


const getAllProjects = async (req, res) => {
    try {
        const { page, size, search, clientId } = req.query;
        const limit = parseInt(size);
        const skip = (page - 1) * size;

        if (clientId == "") {
            const allProjects = await Projects.find(
                {
                    $or: [{ details: { $regex: search, $options: 'i' } }, { technologies: { $regex: search, $options: 'i' } },
                    { credentials: { $regex: search, $options: 'i' } }, { duration: { $regex: search, $options: 'i' } }, { projectName: { $regex: search, $options: 'i' } },
                    { upload: { $regex: search, $options: 'i' } }]
                }).populate('clientId developerId').sort({ createdOn: -1 }).limit(limit).skip(skip);
            res.send({ msg: "Successfully got all Projects!", data: allProjects, status: 200 })

        } else {
            const allProjects = await Projects.find({
                clientId: clientId,
                $or: [{ details: { $regex: search, $options: 'i' } }, { technologies: { $regex: search, $options: 'i' } },
                { credentials: { $regex: search, $options: 'i' } }, { duration: { $regex: search, $options: 'i' } }, { projectName: { $regex: search, $options: 'i' } },
                { upload: { $regex: search, $options: 'i' } }]
            }).populate('clientId developerId').sort({ createdOn: -1 }).limit(limit).skip(skip);
            res.send({ msg: "Successfully got all Projects!", data: allProjects, status: 200 })
        }
    } catch (e) {
        res.send({ msg: e.message, status: 400 })
    }
}

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const projectById = await Projects.findById(id)
        res.send({ msg: "Successfully got project data", data: projectById, status: 200 })
    } catch (e) {
        console.log(e)
        res.send({ msg: e.message, status: 400 })
    }
}

const addProject = async (req, res) => {
    const { developerId, clientId, technologies, credentials, details, duration, projectName, startDate, image, clientCSV } = req.body;
    let newProject = {
        developerId, technologies, clientId: clientId, credentials, details, duration, projectName, startDate, image,
        clientCSV, upload: req.files.image[0].filename, csvName: req.files.clientCSV[0].filename
    }
    const addproject = await Projects.create(newProject);
    res.send({ msg: "New project added succesfully!", data: addproject, status: 200 });
}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const updateById = await Projects.findByIdAndUpdate(id, req.body, { runValidator: true, new: true })
    res.send({ msg: "Project data updated succesfully!", data: updateById, status: 200 })
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteById = await Projects.findByIdAndDelete(id)
        res.send({ msg: "Project deleted successfully!", data: deleteById, status: 200 })
    } catch (e) {
        console.log(e)
        res.send({ msg: e.message, status: 400 })
    }
}

module.exports = {
    getAllProjects, getProjectById, addProject, updateProject, deleteProject
};