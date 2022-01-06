const Projects = require('../models/projects');
const Clients = require('../models/clients');

const getAllProjects = async (req, res) => {
  try {
    const {
      page, size, search, clientId
    } = req.query
    const limit = parseInt(size, 10);
    const skip = (page - 1) * size;

    const totalResults = await Projects.find();
    const totalCount = totalResults.length;

    if (clientId === '') {
      const allProjects = await Projects.find(
        {
          $or: [{ details: { $regex: search, $options: 'i' } }, { technologies: { $regex: search, $options: 'i' } },
            { credentials: { $regex: search, $options: 'i' } }, { duration: { $regex: search, $options: 'i' } },
            { projectName: { $regex: search, $options: 'i' } }
          ]
        }
      ).populate('clientId developerId').sort({ createdOn: -1 }).limit(limit)
        .skip(skip);
      res.send({ msg: process.env.SUCCESS_MESSAGE, data: { allProjects, totalCount }, status: 200 });
    } else {
      const allProjects = await Projects.find({
        clientId: clientId,
        $or: [{ details: { $regex: search, $options: 'i' } }, { technologies: { $regex: search, $options: 'i' } },
          { credentials: { $regex: search, $options: 'i' } }, { duration: { $regex: search, $options: 'i' } },
          { projectName: { $regex: search, $options: 'i' } }
        ]
      }).populate('clientId developerId').sort({ createdOn: -1 }).limit(limit)
        .skip(skip);
      res.send({ msg: 'Successfully got all Projects!', data: { allProjects, totalCount }, status: 200 });
    }
  } catch (e) {
    res.send({ msg: e.message, status: 400 })
  }
}

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params
    const projectById = await Projects.findById(id)
    res.send({ msg: 'Successfully got project data', data: projectById, status: 200 })
  } catch (e) {
    res.send({ msg: e.message, status: 400 })
  }
}

const addProject = async (req, res) => {
  const {
    developerId,
    clientId,
    technologies,
    credentials,
    details,
    duration,
    projectName,
    startDate
  } = req.body

  const newProject = {
    developerId,
    technologies,
    clientId,
    credentials,
    details,
    duration,
    projectName,
    startDate
  }
  const addproject = await Projects.create(newProject);
  const addProjectToClient = await Clients.findByIdAndUpdate(clientId, { $push: { projects: { _id: addproject._id } } });

  res.send({ msg: 'New project added succesfully!', data: addproject, status: 200 })
}

const updateProject = async (req, res) => {
  const { id } = req.params
  const updateById = await Projects.findByIdAndUpdate(
    id,
    req.body,
    { runValidator: true, new: true }
  )
  res.send({ msg: 'Project data updated succesfully!', data: updateById, status: 200 });
}

const addTask = async (req, res) => {
  const { projectId } = req.query;
  const { workId } = req.body;

  const addNewWork = await Projects.findByIdAndUpdate(
    { projectId },
    {
      $push: {
        workId: workId
      }
    }
  )

  res.send({ msg: 'Worked added to project successfully!', data: addNewWork, status: 200 });
}

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Projects.findByIdAndDelete(id);
    const deleteFromClient = await Clients.findOneAndUpdate({ 'projects._id': id }, { $pull: { projects: { _id: id } } });
    res.send({ msg: 'Project deleted successfully!', data: deleteById, status: 200 });
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
}

const bindDeveloper = async (req, res) => {
  const { projectId } = req.query;
  const { newDeveloper } = req.body;

  const addDeveloper = await Projects.findByIdAndUpdate(
    projectId,
    { $push: { developerId: { $each: newDeveloper } } }
  )
  res.send({ msg: 'new developers linked successfully', data: addDeveloper, status: 200 });
}

const getProjectsByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Projects.find({ id });
    res.send({ msg: 'got projects for clientId!', data: projects, status: 200 });
  } catch (error) {
    res.send({ msg: error.message, status: 400 });
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  bindDeveloper,
  addTask,
  getProjectsByClientId
}
