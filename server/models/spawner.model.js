const mongoose = require('mongoose');
const { Location } = require('./utils/utils');

const spawnerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    mobId: {
        type: Number,
        required: true,
    },
    location: {
        type: Location,
        required: true,
    },
    maxAmount: {
        type: Number,
        min: 1,
        default: 1,
    },
    spawnRadius: {
        type: Number,
        min: 1,
        default: 1,
    },
    spawnRate: {
        type: String,
        required: true,
    }
});

const Spawner = mongoose.model('Spawner', spawnerSchema);

module.exports = Spawner;