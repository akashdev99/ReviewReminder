import mongo  from 'mongodb';

let db;
export default {
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
    async getAllReviews() {
        let  review =db.collection("review");
        return await review.find();
    },
};