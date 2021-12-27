const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  regUser,
  userLogin,
  userLogout
} = require("../controllers/users");

const {
  checkAddUser,
  checkLoginUser,
  validate
} = require("../middleware/fieldValidator");

router.get("/", checkWhiteList, getAllUsers);
router.get("/:id", getUserById);
router.post("/add", checkAddUser, validate, addUser);
router.put("/update/:id", checkAddUser, validate, updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/register", checkAddUser, regUser);
router.post("/login", checkLoginUser, validate, userLogin);
router.get("/logout/:id", userLogout);

module.exports = router;
