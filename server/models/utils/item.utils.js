const mongoose = require('mongoose');
const { Location } = require('../utils/utils');

const Action = new mongoose.Schema({
    actionType: {
        type: String,
        required: true,
        enum: ['xp', 'tp']
    },
    xpAmount: {
        type: Number,
        required: function () {
            return this.actionType === 'xp';
        }
    },
    tpLocation: {
        type: Location,
        required: function () {
            return this.actionType === 'tp';
        }
    }
}, { _id: false });

const Recipe = new mongoose.Schema({
    resultId: {
        type: Number,
        required: true,
    },
    resultAmount: {
        type: Number,
        default: 1,
    },
    firstItemId: {
        type: Number,
        required: true,
    },
    firstItemAmount: {
        type: Number,
        default: 1,
    },
    secondItemId: {
        type: Number,
        required: false,
    },
    secondItemAmount: {
        type: Number,
        default: 1,
        required: function () {
            return this.secondItemId !== null;
        },
    },

}, { _id: false });

const Weapon = new mongoose.Schema({
    minDmg: {
        type: Number,
        required: false,
    },
    maxDmg: {
        type: Number,
        reqruired: false
    },
    vampirism: {
        type: Number,
        required: false,
    },
    critChance: {
        type: Number,
        required: false,
    },
    minMagicDmg: {
        type: Number,
        required: false,
    },
    maxMagicDmg: {
        type: Number,
        required: false,
    }
}, { _id: false });

const Armor = new mongoose.Schema({
    armor: {
        type: Number,
        required: true,
    },
    resistance: {
        type: Number,
        required: false,
    },
    regeneration: {
        type: Number,
        required: false,
    },
    health: {
        type: Number,
        required: false,
    },
    armorMagic: {
        type: Number,
        required: false,
    }
}, { _id: false });

module.exports = {
    Action,
    Recipe,
    Weapon,
    Armor,
}