const mongoose = require('mongoose');

const dbConnect = () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error("Please Provide MONGODB_URI Url")
    }
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("MongoDb Connected")
        })
        .catch((err) => {
            throw new Error(err);
        })
}
module.exports = dbConnect;
