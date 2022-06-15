const mongoose = require('mongoose');

const { Stage, QuestReward } = require('./utils/quest.utils');

const questSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requiredLevel: {
        type: Number,
        required: false
    },
    requiredQuests: {
        type: [Number],
        required: false
    },
    stages: {
        type: [Stage],
        required: true,
    },
    rewards: {
        type: QuestReward,
        required: false,
    }
});

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;