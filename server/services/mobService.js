const ApiError = require('../middleware/apiError');
const Mob = require('../models/mob.model');

class MobService {

    static async getAllMobs() {
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