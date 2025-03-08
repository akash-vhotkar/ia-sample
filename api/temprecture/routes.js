const routes = require('express').Router();
const controller = require('./controller');

routes.get('/', controller.getAll)

module.exports = routes;
