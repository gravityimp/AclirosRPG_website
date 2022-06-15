require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true, },
        (err) => {
            if (err) {
                console.log("Error connecting to database: ", err);
            } else {
                console.log("Successfully connected to database!");
            }
        }
    );
};

module.exports = connect;