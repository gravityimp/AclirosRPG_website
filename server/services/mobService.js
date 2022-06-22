const ApiError = require('../middleware/apiError');
const Mob = require('../models/mob.model');

class MobService {

    static async getAllMobs(query) {
        const { limit, page } = query;
        if (Object.keys(query).length !== 0 && page && limit) {

            const _query = {};
            if (query.name) _query.name = { $regex: query.name, $options: 'i' };
            if (query.type) _query.type = { $in: query.type };
            if (query.hostility) _query.hostility = { $in: query.hostility };

            if (query.minLevel || query.maxLevel) {
                _query.level = { $gte: query.minLevel || 1, $lte: query.maxLevel || 1000 };
            }

            const result = await Mob.find(_query).limit(limit).skip(page * limit);
            const lastPage = Math.ceil(await Mob.countDocuments(_query) / limit) - 1;
            return { data: result, lastPage: lastPage };
        }
        return await Mob.find().sort({id: 1});
    }

    static async getMobById(id) {
        const mob = await Mob.findOne({ id: id});
        if (!mob) {
            throw ApiError.NotFoundError(`Mob with id ${id} not found`);
        }
        return mob;
    }

    static async createMob(mob) {
        let newId = 0;
        const mobs = await Mob.find().sort({ id: -1 });
        if (mobs.length > 0) {
            newId = mobs[0].id + 1;
        }
        return await Mob.create({ ...mob, id: newId });
    }

    static async updateMobById(id, mob) {
        const getMob = await Mob.findOne({ id: id});
        if (!getMob) {
            throw ApiError.NotFoundError(`Mob with id ${id} not found`);
        }
        return await Mob.updateOne({ id: id}, {...mob, id: id});
    }

    static async deleteMobById(id) {
        const getMob = await Mob.findOne({ id: id});
        if (!getMob) {
            throw ApiError.NotFoundError(`Mob with id ${id} not found`);
        }
        return await Mob.deleteOne({ id: id});
    }
}

module.exports = MobService;