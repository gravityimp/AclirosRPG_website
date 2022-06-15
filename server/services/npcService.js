const ApiError = require('../middleware/apiError');
const Npc = require('../models/npc.model');

class NpcService {

    static async getAll() {
        return await Npc.find().sort({id: 1});
    }

    static async getNpcById(id) {
        const npc = await Npc.findOne({ id: id});
        if (!npc) {
            throw ApiError.NotFoundError(`Npc with id ${id} not found`);
        }
        return npc;
    }

    static async createNpc(npc) {
        let newId = 0;
        const npcs = await Npc.find().sort({ id: -1 });
        if (npcs.length > 0) {
            newId = npcs[0].id + 1;
        }
        return await Npc.create({ ...npc, id: newId });
    }

    static async updateNpcById(id, npc) {
        const getNpc = await Npc.findOne({ id: id});
        if (!getNpc) {
            throw ApiError.NotFoundError(`Npc with id ${id} not found`);
        }
        return await Npc.updateOne({ id: id}, {...npc, id: id});
    }

    static async deleteNpcById(id) {
        const getNpc = await Npc.findOne({ id: id});
        if (!getNpc) {
            throw ApiError.NotFoundError(`Npc with id ${id} not found`);
        }
        return await Npc.deleteOne({ id: id});
    }
}

module.exports = NpcService;