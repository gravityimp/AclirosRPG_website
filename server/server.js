require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./database');

const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const npcRoutes = require('./routes/npcRoutes');
const questRoutes = require('./routes/questRoutes');
const mobRoutes = require('./routes/mobRoutes');
const spawnerRoutes = require('./routes/spawnerRoutes');

const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/npc', npcRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/mobs', mobRoutes);
app.use('/api/spawners', spawnerRoutes);

app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        connect();
    } catch (e) {
        console.log(e);
    }
};

start();

