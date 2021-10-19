const { application } = require("express");
const express = require("express");
const router = express.Router();
const users = require("./users");
const projects = require("./projects");
//const clients = require("./clients");

router.use("/users", users)
router.use("/projects", projects)
//router.use("/clients", clients)

module.exports = router;