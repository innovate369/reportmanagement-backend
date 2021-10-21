const express = require("express");
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const {getAllClients, addClient, deleteClient} = require("../controllers/clients");

router.get("/", checkWhiteList, getAllClients);
router.post("/add", addClient);
router.delete("/delete/:id", deleteClient);


module.exports = router;