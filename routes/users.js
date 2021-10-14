const express = require("express");
const router = express.Router();

const {getAllUsers, getUserById, addUser, updateUser, deleteUser} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;