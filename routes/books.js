const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { Book, validateBook } = require("../models/books");

//POST: CREATE A NEW BOOK
router.post("/", async (req, res) => {
  const error = await validateBook(req.body);
  if (error.message) res.status(400).send(error.message);

  book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });

  book
    .save()
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send("Book was not stored in DB");
    });
});


module.exports = router;
