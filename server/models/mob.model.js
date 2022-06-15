const mongoose = require('mongoose');

const { Drop, Equipment } = require('./utils/mob.utils');

const mobSchema = new mongoose.Schema({
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
    type: {
        type: String,
        default: 'normal',
        enum: ['normal', 'elite', 'boss', 'special'],
    },
    mobType: {
        type: String,
        required: true,
    },
    hostility: {
        type: String,
        required: true,
        enum: ['friendly', 'hostile', 'passive'],
    },
    isBaby: {
        type: Boolean,
        default: false,
    },
    level: {
        type: Number,
        default: 1,
    },
    health: {
        type: Number,
        default: 10,
    },
    damage: {
        type: Number,
        default: 0,
    },
    equipment: {
        type: Equipment,
        required: true,
    },
    drops: {
        type: Drop,
        required: false,
    },
    skills: {
        type: [String],
        required: false,
    }
});

const Mob = mongoose.model('Mob', mobSchema);

module.exports = Mob;