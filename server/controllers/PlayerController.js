const ApiError = require('../middleware/apiError');
const PlayerService = require('../services/playerService');
const UserService = require('../services/userService');

class PlayerController {
    async getAllPlayers(req, res, next) {
        try {
            const players = await PlayerService.getAllPlayers();
            return res.json(players);
        } catch (e) {
            next(e);
        }
    }

    async getPlayerByUuid(req, res, next) {
        try {
            const player = await PlayerService.getPlayerById(req.params.uuid);
            return res.json(player);
        } catch (e) {
            next(e);
        }
    }

    async generatePlayer(req, res, next) {
        try {
            const player = await PlayerService.generatePlayer(req.body);
            return res.json(player);
        } catch (e) {
            next(e);
        }
    }

    async updatePlayer(req, res, next) {
        try {
            const player = await PlayerService.updatePlayer(req.params.uuid, req.body);
            return res.json(player);
        } catch (e) {
            next(e);
        }
    }

    async deletePlayer(req, res, next) {
        try {
            const player = await PlayerService.deletePlayer(req.params.uuid);
            return res.json(player);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PlayerController();