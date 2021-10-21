const express = require("express");
const router = express.Router();

const {getAllProjects, getProjectById, addProject, updateProject, deleteProject} = require("../controllers/projects");
const { fileStore } = require("../middleware/upload");
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/add",fileStore.single("image"), addProject);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

module.exports = router;