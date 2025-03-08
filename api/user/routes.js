const routes = require('express').Router();
const usercontroller = require('./controller');
const { upload } = require('../../utils/storage');

routes.put('/', usercontroller.updateProfile);
routes.put('/avatar', upload.single('file'), usercontroller.updateAvatar);
routes.get('/', usercontroller.getUserDetails)

module.exports = routes;
