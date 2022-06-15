const bcrypt = require('bcrypt');
const Player = require('../models/player.model');
const tokenService = require('../services/tokenService');
const userDto = require('../dtos/userDtos');
const ApiError = require('../middleware/apiError');

class UserService {
    async register(userData) {
        const { userCode } = userData;
        const player = await Player.findOne({ userCode });
        if(!player || player === null) {
            throw ApiError.NotFoundError(`Invalid code!`);
        }
        const user = player.user;
        if(user.email.includes("@")) {
            throw ApiError.BadRequestError(`Player with username ${player.name} is already registered!`);
        }
        const hashedPassword = await bcrypt.hash(userData.password, process.env.SALT || 5);
        const newUser = {
            email: userData.email,
            password: hashedPassword,
            roles: user.roles,
            createdAt: new Date(),
        }
        const _id = `${player._id.toString()}`;
        
        await Player.findByIdAndUpdate(_id, {user: newUser });    
        
        const dto = new userDto({name: player.name, id: _id, uuid: player.uuid}); // _id, name, uuid
        const tokens = tokenService.generateTokens({ ...dto });
        await tokenService.saveToken(dto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: dto,
        }
    }

    async login(name, password) {
        const player = await Player.findOne({ name });
        if (!player) {
            throw ApiError.NotFoundError(`Player with name ${name} not found`);
        }
        const user = player.user;
        if(!user) {
             throw ApiError.NotFoundError(`Player ${username} is not registered`);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
             throw ApiError.BadRequestError('Invalid password!');
        }
        const _id = `${player._id.toString()}`;
        const dto = new userDto({name: player.name, id: _id, uuid: player.uuid}); // _id, name, uuid
        const tokens = tokenService.generateTokens({ ...dto });
        await tokenService.saveToken(dto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: dto,
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenDatabase = await tokenService.findToken(refreshToken);
        if(!userData && !tokenDatabase) {
            throw ApiError.UnauthorizedError();
        }

        const user = await Player.findById(userData.id);
        const dto = new userDto(user); // id, username
        const tokens = tokenService.generateTokens({ ...dto });
        await tokenService.saveToken(dto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: dto,
        }
    }

    async getAllPlayers(query) {
        if (query._limit && Number(query._limit) >= 1 && query._offset && Number(query._offset) >= 1) {
            return await Player.find({}).skip(query._offset).limit(query._limit);
        }
        else if(query._limit && Number(query._limit) >= 1) {
            query._limit = Math.floor(Number(query._limit));
            return await Player.find({}).limit(query._limit);

        } else if (query._offset && Number(query._offset) >= 1) {
            query._offset = Math.floor(Number(query._offset));
            return await Player.find({}).skip(query._offset);
        }

        return await Player.find();
    }

    async getPlayerById(id) {
        let user = await Player.findById(id);
        if(!user) {
            throw ApiError.NotFoundError(`Player with id ${id} was not found!`);
        }
        return user;
    }
}

module.exports = new UserService();