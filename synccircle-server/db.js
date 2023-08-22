const mongoose = require('mongoose');

let dbConnect;

const uri = process.env.MONGO_URI;
const connectToDb = async () => {
    if (dbConnect) {
        return dbConnect;
    }

    try {
        dbConnect = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
        return dbConnect;
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToDb;