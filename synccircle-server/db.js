const mongoose = require('mongoose');

let dbConnect;

const password = "SC>When2Not69Meet";
//const uri = `mongodb+srv://synccircleapp:${password}@synccircle.2zaulit.mongodb.net/SyncCircle?retryWrites=true&w=majority`
const uri = `mongodb+srv://synccircleapp:${password}@synccircle.2zaulit.mongodb.net/SyncCircle-Test?retryWrites=true&w=majority`


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