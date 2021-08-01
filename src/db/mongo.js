import mongoose from "mongoose";

import config from "../config";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

//const dbConnection = async () => {
//try {
//const db = await mongoose.connect(MONGO_URI, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
//useFindAndModify: false,
//});
//console.log("MongoDB connected");
//} catch (err) {
//console.err(err);
//}
//};

//export default dbConnection;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
