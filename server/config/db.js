const dotenv = require("dotenv");
dotenv.config();

const db = process.env.DATABASE_URL;
const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(db)
        console.log('MongoDb connected Successfully')
    }
    catch (e) {
        console.error('Connection Failed', e);
    }
}

module.exports = connectDb;