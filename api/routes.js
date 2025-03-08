
const routes = require('express').Router();
const authRoutes = require('./auth/routes');
const userRoutes = require('./user/routes');
const coinRoutes = require('./coins/routes');
const tempRoutes = require('./temprecture/routes');
const { authMiddleware } = require('../utils/jwt');


routes.use('/auth', authRoutes);
routes.use('/user', authMiddleware, userRoutes);
routes.use('/coin', authMiddleware, coinRoutes);
routes.use('/temprecture', authMiddleware, tempRoutes);

module.exports = routes;
