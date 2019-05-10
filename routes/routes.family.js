const express = require('express');
const family = express.Router();
const FamilyController = require('../controllers/family.controller');

family
    .get('/', FamilyController.getAllColors)   
    .get('/:color', FamilyController.getColorDetails)
    .get('/:color/:shade',FamilyController.getShadeDetails)
    .post('/create',FamilyController.createColor)
    .put('/:id', FamilyController.updateColor)
    .delete('/:id', FamilyController.deleteColor)

module.exports = family;
