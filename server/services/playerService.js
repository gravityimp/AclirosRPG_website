const ApiError = require('../middleware/apiError');
const Player = require('../models/player.model');
const crypto = require('crypto');

function makeCode() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    if (text.length > 6) {
        text = text.substring(0, 6);
    }
    return text;
}

class PlayerService {

    static async getAllPlayers(query) {

        const { limit, page } = query;

        if (Object.keys(query).length !== 0 && page && limit) {

            const _query = {};
            if (query.name) _query.name = { $regex: query.name, $options: 'i' };

            if (query.minLevel || query.maxLevel) {
                _query.rpg.level = { $gte: query.minLevel || 1, $lte: query.maxLevel || 1000 };
            }

            const result = await Player.find(_query).limit(limit).skip(page * limit);
            const lastPage = Math.ceil(await Player.countDocuments(_query) / limit) - 1;
            return { data: result, lastPage: lastPage };
        }
        return await Player.find().sort({ id: 1 });
    }

    static async getPlayerById(uuid) {
        const player = await Player.findOne({ uuid: uuid });
        if (!player) {
            throw ApiError.NotFoundError(`Player with uuid ${uuid} not found`);
        }
        return player;
    }

    static async getPlayerByName(name) {
        const player = await Player.findOne({ name: name });
        if (!player) {
            throw ApiError.NotFoundError(`Player with name ${name} not found`);
        }
        return player;
    }

    static async getPlayerRoles(uuid) {
        const player = await Player.findOne({ uuid: uuid });
        if (!player) {
            throw ApiError.NotFoundError(`Player with uuid ${uuid} not found`);
        }
        return player.user.roles;
    }

    static async generatePlayer(player) {
        const _p = await Player.findOne({ name: player.name })
        if (_p || _p !== null) {
            throw ApiError.NotFoundError(`Player with name ${player.name} is already registered`);
        }
        const code = makeCode()
        const uuid = crypto.randomUUID().toString();
        const _player = {
            ...player,
            uuid,
            playData: {
                isBanned: false,
                isOnline: false,
                timePlayed: "0 seconds",
                lastOnline: "never",
                lastOnlineUnix: 0
            },
            settings: {
                canAcceptMessages: true,
                canAcceptPartyInvites: true,
                canAcceptTradeRequests: true,
                canAcceptFriendRequests: true,
            },
            rpg: {
                level: 1,
                xp: 0,
                reqXp: 24,
                strength: 0,
                agillity: 0,
                intelligence: 0
            },
            userCode: code,
            user: {
                email: uuid,
                password: 'XD',
                roles: [
                    { role: 'user' }
                ],
                createdAt: new Date(),
            }
        }
        return await Player.create(_player);
    }

    static async updatePlayer(uuid, player) {
        const getPlayer = await Player.findOne({ uuid: uuid });
        if (!getPlayer) {
            throw ApiError.NotFoundError(`Player with uuid ${uuid} not found`);
        }
        return await Player.updateOne({ uuid: uuid }, player);
    }

    static async deletePlayer(uuid) {
        const getPlayer = await Player.findOne({ uuid: uuid });
        if (!getPlayer) {
            throw ApiError.NotFoundError(`Player with uuid ${uuid} not found`);
        }
        return await Player.deleteOne({ uuid: uuid });
    }
}

module.exports = PlayerService;