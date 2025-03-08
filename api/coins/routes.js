
const routes = require('express').Router();
const controller = require('./controller');

routes.get('/', controller.getAllCoins);
routes.get('/graph', controller.getGraphData);

module.exports = routes;
