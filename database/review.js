class Review {
    constructor(db) {
      this.collection = db.collection('review');
    }
    async addReview(review) {
      const newUser = await this.collection.insertOne(review);
      return newUser;
    }
    async getAllReviews() {
        const reviews = this.collection.find({});
        const allEntries = await reviews.toArray();
        return allEntries
    }
  }
 export default Review;