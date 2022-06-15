const mongoose = require('mongoose');

const Role = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
    }
}, { _id: false });

const Location = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    z: {
        type: Number,
        required: true,
    },
    pitch: {
        type: Number,
        required: false,
    },
    yaw: {
        type: Number,
        required: false,
    }
}, { _id: false });

const Requirements = new mongoose.Schema({
    level: {
        type: Number,
        min: 1,
        required: true,
    },
    strength: {
        type: Number,
        min: 1,
        required: false,
    },
    agillity: {
        type: Number,
        min: 1,
        required: false,
    },
    intelligence: {
        type: Number,
        min: 1,
        required: false,
    },
    quest: {
        type: Number,
        required: false,
    }
}, { _id: false });

const ItemDrop = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true,
    },
    itemAmount: {
        type: Number,
        required: true,
    },
    maxItemAmount: {
        type: Number,
        required: false,
    },
    chance: {
        type: Number,
        min: 0.001,
        max: 100,
        set: v => v.toFixed(3),
        required: true,
    },
}, { _id: false });

module.exports = {
    Role,
    Location,
    Requirements,
    ItemDrop,
}