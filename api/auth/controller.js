const Service = require('../../db/user/service');
const bcrypt = require('bcrypt');
const { handler } = require('../../utils/handler');
const { generateAuthToken } = require('../../utils/jwt');

class AuthController {
    async googleLoginorRegister(req, res) {
        try {
            let token = req.query.token;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const { sub, email, name, picture } = ticket.getPayload();
            const record = await Service.get({ email });
            if (record) {
                if (!record.isGoogle) {
                    return handler(res, { code: 200, type: "VALIDATION_ERROR", message: "User is not registered with google!" });
                }
                const token = generateAuthToken({ email, _id: record._id });
                return handler(res, { token, user: record });
            }
            let user = {
                email,
                name,
                avatar: picture,
                isGoogle: true,
                GoogleId: sub
            }
            const dbuser = await Service.create(user);
            let newtoken = generateAuthToken({ _id: dbuser._id, email: dbuser.email });
            return handler(res, { token: newtoken, data: dbuser })
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
    async Login(req, res) {
        try {
            let { password, email } = req.body;
            const record = await Service.getPassowrd({ email })
            const isMatched = await bcrypt.compare(password, record.password)
            if (isMatched) {
                const token = generateAuthToken({ email, _id: record._id });
                delete record.password;
                return handler(res, { code: 200, type: "SUCCESS", message: "Login Successfull!", data: { token, user: record } })
            }
            else {
                return handler(res, { code: 400, type: 'VALIDATION_ERROR', message: "Invalid email or password!" })
            }
        }
        catch (error) {
            return handler(res, { code: 500 }, error)
        }
    }
    async Register(req, res) {
        try {
            const user = await Service.create(req.body);
            return handler(res, { code: 200, type: 'SUCCESS', message: "Registeration Successfully!!", data: user })
        }
        catch (error) {
            return handler(res, { code: 500 }, error)
        }
    }

}

module.exports = new AuthController();
