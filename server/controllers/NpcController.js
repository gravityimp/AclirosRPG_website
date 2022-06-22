const NpcService = require("../services/npcService");

class NpcController {
    async getAll(req, res, next) {
        try {
            const npcList = await NpcService.getAll(req.query);
            res.json(npcList);
        } catch (err) {
            next(err);
        }
    }

    async getNpcById(req, res, next) {
        try {
            const npc = await NpcService.getNpcById(req.params.id);
            res.json(npc);
        } catch (err) {
            next(err);
        }
    }

    async createNpc(req, res, next) {
        try {
            const npc = await NpcService.createNpc(req.body);
            res.json(npc);
        } catch (err) {
            next(err);
        }
    }

    async updateNpcById(req, res, next) {
        try {
            const npc = await NpcService.updateNpcById(req.params.id, req.body);
            res.json(npc);
        } catch (err) {
            next(err);
        }
    }

    async deleteNpcById(req, res, next) {
        try {
            const npc = await NpcService.deleteNpcById(req.params.id);
            res.json(npc);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new NpcController();