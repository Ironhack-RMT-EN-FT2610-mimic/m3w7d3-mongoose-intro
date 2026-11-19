const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/artists-db";

mongoose
  .connect(MONGO_URI)
  .then((response) => {
    console.log("all good, connected to the DB");
  })
  .catch((error) => {
    console.log(error);
  });