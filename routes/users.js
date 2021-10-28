const express = require("express");
//const cors = require('cors')

const router = express.Router();
const checkWhiteList = require("../middleware/check");

const { fileStore } = require("../middleware/upload");
const {getAllUsers, getUserById, addUser, updateUser, deleteUser, fileUpload, regUser, userLogin} = require("../controllers/users");

router.get("/", checkWhiteList, getAllUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/upload", fileStore.single("image"), fileUpload);
router.post("/register", regUser);
router.post("/login", userLogin)


module.exports = router;