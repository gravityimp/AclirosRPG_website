const mongoose = require('mongoose');

const StageItemReward = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true,
    },
    itemAmount: {
        type: Number,
        default: 1,
    },
}, { _id: false });

const QuestReward = new mongoose.Schema({
    experience: {
        type: Number,
        min: 1,
        required: false,
    },
    permissions: {
        type: [String],
        required: false,
    },
    items: {
        type: [StageItemReward],
        required: false,
    }
}, { _id: false });

const Stage = new mongoose.Schema({
    stageName: {
        type: String,
        required: true,
    },
    stageNPCId: {
        type: Number,
        required: true,
    },
    stageType: {
        type: String,
        enum: ['kill', 'gather', 'talk', 'find'],
        required: true,
    },
    stageDialog: {
        type: [String],
        required: true,
    },
    stageRewards: {
        type: [StageItemReward],
        required: false,
    }
}, { _id: false });

module.exports = {
    Stage,
    QuestReward,
}