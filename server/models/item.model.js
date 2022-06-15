const mongoose = require('mongoose');

const { Requirements } = require('./utils/utils');
const { Action, Recipe, Weapon, Armor } = require('./utils/item.utils');

const itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        set: v => Math.floor(v),
    },
    name: {
        type: String,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['weapon', 'armor', 'material', 'action', 'recipe'],
    },
    rarity: {
        type: String,
        required: true,
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary', 'artifact'],
    },
    lore: {
        type: String,
        required: false,
    },
    playerBound: {
        type: Boolean,
        default: false,
    },
    requirements: {
        type: Requirements,
        required: false,
    },
    action: {
        type: Action,
        required: function() {
            return this.type === 'action';
        },
    },
    recipe: {
        type: Recipe,
        required: function() {
            return this.type === 'recipe';
        }
    },
    weapon: {
        type: Weapon,
        required: function() {
            return this.type === 'weapon';
        }
    },
    armor: {
        type: Armor,
        required: function() {
            return this.type === 'armor';
        }
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;