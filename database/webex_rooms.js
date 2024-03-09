class UserWebexRooms {
    constructor(db) {
      this.collection = db.collection('webexrooms');
    }
    async addUserRoom(roomsInfo) {
      const roomInfo = await this.collection.insertOne(roomsInfo);
      return roomInfo;
    }
    async getAllUserRooms() {
        const rooms = this.collection.find({});
        return await rooms.toArray();
    }


  }
 export default UserWebexRooms;