const {MongoClient} = require('mongodb');

let dbConnect;

const password = "SC>When2Not69Meet";
const uri = `mongodb+srv://synccircleapp:${password}@synccircle.2zaulit.mongodb.net/SyncCircle?retryWrites=true&w=majority`

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri).then((client) => {
            dbConnect = client.db();
            return callback();
        }).catch((err) => {
            console.log(err)
            return callback(err);
        });
    },
    getDb: () => dbConnect
}