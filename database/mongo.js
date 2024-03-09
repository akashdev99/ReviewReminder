import  mongodb from 'mongodb';
import Review from './review.js';
import UserWebexRooms from './webex_rooms.js';

class MongoBot {
  constructor() {
    const url = process.env.MONGODB;

    this.client = new  mongodb.MongoClient(url);
  }
  async init() {
    await this.client.connect();
    console.log('connected');

    this.db = this.client.db("botkit_db");
    this.Review = new Review(this.db);
    this.UserWebexRooms = new UserWebexRooms(this.db);
  }
}
export default new MongoBot();