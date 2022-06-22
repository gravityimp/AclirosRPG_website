const ApiError = require('../middleware/apiError');
const Item = require('../models/item.model');

class ItemService {

    static async getAllItems(query) {
        const { limit, page } = query;
        if (Object.keys(query).length !== 0 && page && limit) {

            const _query = {};
            if (query.name) _query.name = { $regex: query.name, $options: 'i' };
            if (query.type) _query.type = { $in: query.type };
            if (query.rarity) _query.rarity = { $in: query.rarity };
            if (query.playerBound) _query.playerBound = query.playerBound;

            if (query.minLevel || query.maxLevel) {
                _query.level = { $gte: query.minLevel || 1, $lte: query.maxLevel || 1000 };
            }

            const result = await Item.find(_query).limit(limit).skip(page * limit);
            const lastPage = Math.ceil(await Item.countDocuments(_query) / limit) - 1;
            return { data: result, lastPage: lastPage };
        }
        return await Item.find().sort({id: 1});
    }

    static async getItemById(id) {
        const item = await Item.findOne({ id: id});
        if (!item) {
            throw ApiError.NotFoundError(`Item with id ${id} not found`);
        }
        return item;
    }

    static async createItem(item) {
        let newId = 0;
        const items = await Item.find().sort({ id: -1 });
        if (items.length > 0) {
            newId = items[0].id + 1;
        }
        return await Item.create({ ...item, id: newId });
    }

    static async updateItemById(id, item) {
        const getItem = await Item.findOne({ id: id});
        if (!getItem) {
            throw ApiError.NotFoundError(`Item with id ${id} not found`);
        }
        return await Item.updateOne({ id: id}, {...item, id: id});
    }

    static async deleteItemById(id) {
        const getItem = await Item.findOne({ id: id});
        if (!getItem) {
            throw ApiError.NotFoundError(`Item with id ${id} not found`);
        }
        return await Item.deleteOne({ id: id});
    }
}

module.exports = ItemService;