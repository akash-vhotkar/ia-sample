const Joi = require("joi");
const { handler } = require("../../utils/handler");

const registerValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .min(8)
                .max(30)
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
                .message(
                    "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
                )
                .required(),
        });
        let state = schema.validate(req.body);
        if (state.error) {
            return handler(res, { code: 400, type: "VALIDATION_ERROR", message: state.error.message })
        }
        next();
    }
    catch (error) {
        return handler(res, { code: 500 }, error)
    }
};

const loginValidation = (req, res, next) => {
    try {

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
        let state = schema.validate(req.body);
        if (state.error) {
            return handler(res, { code: 400, type: "VALIDATION_ERROR", message: state.error.message })
        }
        next();
    }
    catch (error) {
        return handler(res, { code: 500 }, error)
    }
};

module.exports = { registerValidation, loginValidation };
