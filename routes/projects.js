const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  bindDeveloper,
  addTask,
  getProjectsByClientId
} = require("../controllers/projects");

const { fileStore } = require("../middleware/upload");

const {
  checkAddProject,
  validate
} = require("../middleware/fieldValidator");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/add",fileStore.fields([{ name: "image", maxCount: 1 }, { name: "clientCSV", maxCount: 1 }]),
  checkAddProject,
  validate,
  addProject
);
router.get("/byClientId/:id", getProjectsByClientId);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);
router.put("/bindDeveloper", bindDeveloper);
router.put("/addTask", addTask);

module.exports = router;
