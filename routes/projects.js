const express = require("express");
const router = express.Router();

const {getAllProjects, getProjectById, addProject, updateProject, deleteProject} = require("../controllers/projects");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/add", addProject);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

module.exports = router;