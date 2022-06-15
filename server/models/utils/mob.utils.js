const mongoose = require('mongoose');

const { ItemDrop } = require('./utils');

const Drop = new mongoose.Schema({
    experience: {
        type: Number,
        min: 1,
        required: false,
    },
    items: {
        type: [ItemDrop],
        required: false,
    },
}, { _id: false });

const Equipment = new mongoose.Schema({
    main: {
        type: String,
        default: 'air',
    },
    off: {
        type: String,
        default: 'air',
    },
    head: {
        type: String,
        default: 'air',
    },
    chest: {
        type: String,
        default: 'air',
    },
    legs: {
        type: String,
        default: 'air',
    },
    feet: {
        type: String,
        default: 'air',
    },
}, { _id: false });

module.exports = {
    Drop,
    Equipment,
}