const express = require('express');

const router = express.Router();
const users = require('./users');
const projects = require('./projects');
const clients = require('./clients');
const dashboard = require('./dashboard');
const quotation = require('./quotation');

router.use('/users', users);
router.use('/projects', projects);
router.use('/clients', clients);
router.use('/dashboard', dashboard);
router.use('/quotation', quotation);

module.exports = router;
