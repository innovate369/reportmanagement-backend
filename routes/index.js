const {application} = require("express");
const express = require("express");
const router = express.Router();
const users = require("./users");
const projects = require("./projects");
const clients = require("./clients");
const dashboard = require("./dashboard");

router.use("/users", users)
router.use("/projects", projects)
router.use("/clients", clients)
router.use("/dashboard", dashboard)

module.exports = router;