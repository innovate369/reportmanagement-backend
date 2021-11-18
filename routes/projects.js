const express = require('express');

const router = express.Router();

const {
  getAllProjects, getProjectById, addProject, updateProject, deleteProject, bindDeveloper,
} = require('../controllers/projects');
const { fileStore } = require('../middleware/upload');
const { checkAddProject, validate, checkBindDeveloper } = require('../middleware/fieldValidator');

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/add', fileStore.fields([{ name: 'image', maxCount: 1 }, { name: 'clientCSV', maxCount: 1 }]), checkAddProject, validate, addProject);
router.put('/update/:id', checkAddProject, validate, updateProject);
router.delete('/delete/:id', deleteProject);
router.put('/bindDeveloper', checkBindDeveloper, validate, bindDeveloper);

module.exports = router;
