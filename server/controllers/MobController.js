const MobService = require("../services/mobService");

class MobController {
    async getAllMobs(req, res, next) {
        try {
            const mobs = await MobService.getAllMobs();
            return res.json(mobs);
        } catch (e) {
            next(e);
        }
    }

    async getMobById(req, res, next) {
        try {
            const mob = await MobService.getMobById(req.params.id);
            return res.json(mob);
        } catch (e) {
            next(e);
        }
    }

    async createMob(req, res, next) {
        try {
            const mob = await MobService.createMob(req.body);
            return res.json(mob);
        } catch (e) {
            next(e);
        }
    }

    async updateMobById(req, res, next) {
        try {
            const mob = await MobService.updateMobById(req.params.id, req.body);
            return res.json(mob);
        } catch (e) {
            next(e);
        }
    }

    async deleteMobById(req, res, next) {
        try {
            const mob = await MobService.deleteMobById(req.params.id);
            return res.json(mob);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MobController();