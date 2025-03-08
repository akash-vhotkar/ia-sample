const Service = require('../../db/user/service');
const { handler } = require('../../utils/handler');

class UserController {
    async getUserDetails(req, res) {
        try {
            let data = await Service.get({ _id: req.local._id });
            return handler(res, { code: 200, type: 'SUCCESS', data })
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
    async updateProfile(req, res) {
        try {
            const data = await Service.update({ _id: req.local._id }, req.body);
            return handler(res, { code: 200, type: 'SUCCESS', data });
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
    async updateAvatar(req, res) {
        try {
            const data = await Service.update({ _id: req.local._id }, { avatar: req.file.location })
            return handler(res, { code: 200, type: "SUCCESS", message: "Avatar Updated!", data })
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
}

module.exports = new UserController();
