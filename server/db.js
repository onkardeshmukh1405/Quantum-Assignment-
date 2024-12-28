const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://mern:mern@cluster0.cjaslzg.mongodb.net/Assignment?retryWrites=true&w=majority&appName=Cluster0";

exports.connectDatabase = () => {
  mongoose
    .connect(MONGO_URL)
    .then((con) => console.log(`Database Connected: on Atlas `))
    .catch((err) => console.log(err));
};
