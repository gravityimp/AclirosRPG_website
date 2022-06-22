const ApiError = require('../middleware/apiError');
const Quest = require('../models/quest.model');

class QuestService {

    static async getAllQuests(query) {
        const { limit, page } = query;
        if (Object.keys(query).length !== 0 && page && limit) {

            const _query = {};
            if (query.name) _query.name = { $regex: query.name, $options: 'i' };
            if (query.minLevel || query.maxLevel) _query.requiredLevel = { $gte: query.minLevel || 1, $lte: query.maxLevel || 999 };

            const result = await Quest.find(_query).limit(limit).skip(page * limit);
            const lastPage = Math.ceil(await Quest.countDocuments(_query) / limit) - 1;
            return { data: result, lastPage: lastPage };
        }
        return await Quest.find().sort({id: 1});
    }

    static async getQuestById(id) {
        const quest = await Quest.findOne({id: id});
        if(!quest) {
            throw ApiError.NotFoundError(`Quest with id ${id} was not found!`);
        }
        return quest;
    }

    static async createQuest(quest) {
        let newId = 0;
        const quests = await Quest.find().sort({ id: -1 });
        if (quests.length > 0) {
            newId = quests[0].id + 1;
        }
        return await Quest.create({ ...quest, id: newId });
    }

    static async updateQuestById(id, quest) {
        const getQuest = await Quest.findOne({ id: id});
        if (!getQuest) {
            throw ApiError.NotFoundError(`Quest with id ${id} not found`);
        }
        return await Quest.updateOne({ id: id}, {...quest, id: id});
    }

    static async deleteQuestById(id) {
        const getQuest = await Quest.findOne({ id: id});
        if (!getQuest) {
            throw ApiError.NotFoundError(`Quest with id ${id} not found`);
        }
        return await Quest.deleteOne({ id: id});
    }
}

module.exports = QuestService;