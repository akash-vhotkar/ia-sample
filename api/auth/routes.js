const routes = require('express').Router();
const controller = require('./controller');
const { loginValidation, registerValidation } = require('./validator');

routes.post('/login', loginValidation, controller.Login);
routes.post('/register', registerValidation, controller.Register);
routes.post('/google', controller.googleLoginorRegister)

module.exports = routes;
