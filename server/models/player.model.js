const mongoose = require('mongoose');

const { PlayData, PlayerSettings, PlayerQuests, Account, PlayerRpg } = require('./utils/player.utils');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    settings: {
        type: PlayerSettings,
        required: false,
    },
    permissions: {
        type: [String],
        default: [],
    },
    playData: {
        type: PlayData,
        default: {
            isBanned: false,
            isOnline: false,
            timePlayed: "0 seconds",
            lastOnline: "never",
            lastOnlineUnix: 0
        }
    },
    rpg: {
        type: PlayerRpg,
        default: {
            level: 1,
            xp: 0,
            reqXp: 24,
            strength: 0,
            agillity: 0,
            intelligence: 0
        }
    },
    quests: {
        type: PlayerQuests,
        default: {
            completed: [],
            active: [],
        },
    },
    user: {
        type: Account,
        required: false,
    },
    userCode: {
        type: String,
        length: 6,
        required: false,
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;