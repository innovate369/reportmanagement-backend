const express = require("express");
const router = express.Router();
const checkWhiteList = require("../middleware/check");

const {getAllClients, addClient, deleteClient, clientInvoice, bindProject} = require("../controllers/clients");

router.get("/", checkWhiteList, getAllClients);
router.post("/add", addClient);
router.delete("/delete/:id", deleteClient);
router.post("/invoice", clientInvoice)
router.put("/bindProject", bindProject);

module.exports = router;