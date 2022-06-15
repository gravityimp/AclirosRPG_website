const ApiError = require('../middleware/apiError');
const Spawner = require('../models/spawner.model');

class SpawnerService {

    static async getAllSpawners() {
        return await Spawner.find().sort({id: 1});
    }

    static async getSpawnerById(id) {
        const spawner = await Spawner.findOne({ id: id});
        if (!spawner) {
            throw ApiError.NotFoundError(`Spawner with id ${id} not found`);
        }
        return spawner;
    }

    static async createSpawner(spawner) {
        let newId = 0;
        const spawners = await Spawner.find().sort({ id: -1 });
        if (spawners.length > 0) {
            newId = spawners[0].id + 1;
        }
        return await Spawner.create({ ...spawner, id: newId });
    }

    static async updateSpawnerById(id, spawner) {
        const getSpawner = await Spawner.findOne({ id: id});
        if (!getSpawner) {
            throw ApiError.NotFoundError(`Spawner with id ${id} not found`);
        }
        return await Spawner.updateOne({ id: id}, {...spawner, id: id});
    }

    static async deleteSpawnerById(id) {
        const getSpawner = await Spawner.findOne({ id: id});
        if (!getSpawner) {
            throw ApiError.NotFoundError(`Spawner with id ${id} not found`);
        }
        return await Spawner.deleteOne({ id: id});
    }

}

module.exports = SpawnerService;