const UserService = require('../services/userService');
const { validationResult } = require('express-validator');
const Joi = require('joi'); 
const ApiError = require('../middleware/apiError');

function validate(data) {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        userCode: Joi.string().length(6).required(),
    })
    return schema.validate(data)
}

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError('Validation error', errors.array()));
            }

            const errors2 = validate(req.body);
            if (errors2.error) {
                return next(ApiError.BadRequestError('Validation error Joi:', errors2.error.details[0].message));
            }

            let userData = req.body;
            userData = await UserService.register(userData);

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { name, password } = req.body;
            const userData = await UserService.login(name, password);
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Logout success!' });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();