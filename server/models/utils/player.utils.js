const mongoose = require('mongoose');
const { Role } = require('./utils');

const PlayData = new mongoose.Schema({
    isBanned: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        required: true,
    },
    timePlayed: {
        type: String,
        required: true,
    },
    lastOnline: {
        type: String,
        required: true,
    },
    lastOnlineUnix: {
        type: Number,
        required: true,
    },
}, { _id: false });

const PlayerRpg = new mongoose.Schema({
    level: {
        type: Number,
        default: 1,
    },
    xp: {
        type: Number,
        default: 0,
    },
    reqXp: {
        type: Number,
        default: 24
    },
    strength: {
        type: Number,
        default: 0
    },
    agillity: {
        type: Number,
        default: 0
    },
    intelligence: {
        type: Number,
        default: 0
    }
}, { _id: false });

const PlayerSettings = new mongoose.Schema({
    canAcceptMessages: {
        type: Boolean,
        default: true,
    },
    canAcceptPartyInvites: {
        type: Boolean,
        default: true,
    },
    canAcceptTradeRequests: {
        type: Boolean,
        default: true,
    },
    canAcceptFriendRequests: {
        type: Boolean,
        default: true,
    },
}, { _id: false });

const CompletedQuest = new mongoose.Schema({
    questId: {
        type: Number,
        required: true,
    },
    completionDate: {
        type: String,
        required: true,
    }
}, { _id: false });

const ActiveQuest = new mongoose.Schema({
    questId: {
        type: Number,
        required: true,
    },
    questStage: {
        type: Number,
        required: true,
    },
}, { _id: false });

const PlayerQuests = new mongoose.Schema({
    completed: {
        type: [CompletedQuest],
        default: [],
    },
    active: {
        type: [ActiveQuest],
        default: [],
    }
}, { _id: false });

const Account = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [Role],
        default: [{role: 'user'}],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {_id: false});

module.exports = {
    PlayData,
    PlayerRpg,
    PlayerSettings,
    PlayerQuests,
    Account
}