const ItemService = require("../services/itemService");

class ItemController {
    async getAllItems(req, res, next) {
        try {
            const items = await ItemService.getAllItems(req.query);
            return res.json(items);
        } catch (e) {
            next(e);
        }
    }

    async getItemById(req, res, next) {
        try {
            const item = await ItemService.getItemById(req.params.id);
            return res.json(item);
        } catch (e) {
            next(e);
        }
    }

    async createItem(req, res, next) {
        try {
            const item = await ItemService.createItem(req.body);
            return res.json(item);
        } catch (e) {
            next(e);
        }
    }

    async updateItemById(req, res, next) {
        try {
            const item = await ItemService.updateItemById(req.body.id, req.body);
            return res.json(item);
        } catch (e) {
            next(e);
        }
    }

    async deleteItemById(req, res, next) {
        try {
            const item = await ItemService.deleteItemById(req.params.id);
            return res.json(item);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ItemController();