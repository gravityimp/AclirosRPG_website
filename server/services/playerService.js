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

    static async getAllPlayers() {
        return await Player.find().sort({ name: 1 });
    }

    static async getPlayerById(uuid) {
        const player = await Player.findOne({ uuid: uuid });
        if (!player) {
            throw ApiError.NotFoundError(`Player with uuid ${uuid} not found`);
        }
        return player;
    }

    static async generatePlayer(player) {
        const _p = await Player.findOne({name: player.name})
        console.log(_p)
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
                    {role: 'user'}
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
        return await Player.updateOne({ uuid: uuid }, { ...player, uuid: uuid });
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