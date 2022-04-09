const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//connect to mongodb Atlas
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });

//start server
app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
