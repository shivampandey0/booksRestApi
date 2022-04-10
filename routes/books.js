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

// GET ALL Books
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

// Get the book by id
router.get("/:bookId", (req, res) => {
  console.log("data", req.params.bookId);
  Book.findById(req.params.bookId)
    .then((book) => {
      if (book) res.send(book);
      res.status(404).send("Book not found");
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

//Update Book Based on Id
router.put("/:bookId", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.bookId,
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    },
    { new: true }
  );
  console.log("updatedBook", updatedBook);

  if (!updatedBook) res.status(404).send("Book not found");
  res.send(updatedBook);
});

//Delete Book
router.delete("/:bookId", async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.bookId);

  if (!book) res.status(404).send("book with id not found");
  res.send(book);
});

module.exports = router;
