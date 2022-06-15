const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();