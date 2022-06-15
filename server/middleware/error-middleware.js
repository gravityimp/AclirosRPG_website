const ApiError = require('./apiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors, statusCode: err.status});
    }
    return res.status(500).json({message: 'Internal server error!'+err, statusCode: 500, errors: err.errors});
}