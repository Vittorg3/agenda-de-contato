const express = require('express');
const route = express.Router();

const controller = require('../controllers/controller');

const validator = require('../validators/contactValidator');

route.get('/ping', (req, res) => res.status(200).json({pong: true}));

route.post('/create/contact/', validator.newContact, controller.create);
route.post('/create/contact/:contactID/phone/', controller.insertPhone);
route.put('/update/contact/:contactID/', validator.updateContact, controller.update);
route.delete('/delete/contact/:contactID/', controller.delete);
route.get('/contacts/', controller.find);

module.exports = route;
