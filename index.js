const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
require("dotenv").config();
const booksRoute = require("./routes/books");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//routes
app.use("/api/books", booksRoute);

//connect to mongodb Atlas
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    logger.error(err.message);
  });

//start server
app.listen(PORT, () => {
  logger.warn(`Server started at PORT ${PORT}`);
});
