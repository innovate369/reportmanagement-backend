const express = require('express');

const router = express.Router();
//const checkWhiteList = require('../middleware/check');

const {
    addWork,
    getWorkWithClientId,
    getAllWorks,
    addNewWork
 
} = require('../controllers/work');

router.get('/', getAllWorks);
router.get('/workWithClientId',getWorkWithClientId);
router.put('/add', addWork);
router.put('/addNewWork', addNewWork);
//router.delete('/delete/:id', deleteWork);


module.exports = router;
