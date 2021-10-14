const express = require("express");
const router = express.Router();

const {getAllUsers, getUserById, addUser} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/add", addUser);


module.exports = router;