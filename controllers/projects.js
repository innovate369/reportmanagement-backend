const projects = require("../models/projects");

const getAllProjects = async(req, res) => {
    try
    {
        const allProjects = await projects.find({});
        res.send({msg: "Successfully got all Projects!", data: allProjects, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
    }
}

const getProjectById = async(req, res) => {
    try
    {
        const {id} = req.params;
        const projectById = await projects.findById(id)
        res.send({msg: "Successfully got project data", data: projectById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
                }       
}

const addProject = async(req, res) => {
    try
    {
        const {developerId, clientId, technologies, credentials, details, duration, projectName, startDate} = req.body;
        let newProject = {developerId: JSON.parse(developerId), clientId: clientId, technologies: technologies, credentials: credentials, details: details, duration: duration, projectName: projectName, startDate: startDate}
        const addproject = await projects.create(newProject);
        res.send({msg: "New project added succesfully!", data: addproject, status: 200});
    } catch(e) {
        console.log(e)
        res.send({msg: e.message, status: 400})
            }
}

const updateProject = async(req, res) => {
    try
    {
        const {id} = req.params;
        const updateById = await projects.findByIdAndUpdate(id, req.body, {runValidator: true, new: true})
        res.send({msg: "Project data updated succesfully!", data: updateById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
        }
}

const deleteProject = async(req, res) => {
    try
    {
        const {id} = req.params;
        const deleteById = await projects.findByIdAndDelete(id)
        res.send({msg: "Project deleted successfully!", data: deleteById, status: 200})
    } catch(e){
        console.log(e)
        res.send({msg: e.message, status: 400})
        }
}

module.exports = {
    getAllProjects, getProjectById, addProject, updateProject, deleteProject
};