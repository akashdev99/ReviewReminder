const mongo = require('mongodb');

let db;
module.exports = {
        async connect(uri) {
            const mongoClient = new mongo.MongoClient(uri);
            await mongoClient.connect();
            db = mongoClient.db()
        },
    getDb(){
        return db;
    },
    async savePr(data) {
        let  review =db.collection("review");
        await review.insertOne(data)
    },
};