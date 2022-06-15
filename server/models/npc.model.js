const mongoose = require('mongoose');

const { Location } = require('./utils/utils');

const npcSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: Location,
        required: true,
    },
    skin: {
        type: String,
        required: false,
    }
});

const Npc = mongoose.model('Npc', npcSchema);

module.exports = Npc;