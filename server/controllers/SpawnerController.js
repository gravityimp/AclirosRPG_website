const SpawnerService = require("../services/spawnerService");

class SpawnerController {

    async getAllSpawners(req, res, next) {
        try {
            const spawners = await SpawnerService.getAllSpawners();
            return res.json(spawners);
        } catch (e) {
            next(e);
        }
    }

    async getSpawnerById(req, res, next) {
        try {
            const spawner = await SpawnerService.getSpawnerById(req.params.id);
            return res.json(spawner);
        } catch (e) {
            next(e);
        }
    }

    async createSpawner(req, res, next) {
        try {
            const spawner = await SpawnerService.createSpawner(req.body);
            return res.json(spawner);
        } catch (e) {
            next(e);
        }
    }

    async updateSpawnerById(req, res, next) {
        try {
            const spawner = await SpawnerService.updateSpawnerById(req.params.id, req.body);
            return res.json(spawner);
        } catch (e) {
            next(e);
        }
    }

    async deleteSpawnerById(req, res, next) {
        try {
            const spawner = await SpawnerService.deleteSpawnerById(req.params.id);
            return res.json(spawner);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SpawnerController();