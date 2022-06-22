const QuestService = require('../services/questService');

class QuestController {
    async getAllQuests(req, res, next) {
        try {
            const quests = await QuestService.getAllQuests(req.query);
            return res.json(quests);
        } catch (e) {
            next(e);
        }
    }

    async getQuestById(req, res, next) {
        try {
            const quest = await QuestService.getQuestById(req.params.id);
            return res.json(quest);
        } catch (e) {
            next(e);
        }
    }

    async createQuest(req, res, next) {
        try {
            const quest = await QuestService.createQuest(req.body);
            return res.json(quest);
        } catch (e) {
            next(e);
        }
    }

    async updateQuestById(req, res, next) {
        try {
            const quest = await QuestService.updateQuestById(req.params.id, req.body);
            return res.json(quest);
        } catch (e) {
            next(e);
        }
    }

    async deleteQuestById(req, res, next) {
        try {
            const quest = await QuestService.deleteQuestById(req.params.id);
            return res.json(quest);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new QuestController();