const ApiError = require('../middleware/apiError');
const Quest = require('../models/quest.model');

class QuestService {

    static async getAllQuests() {
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