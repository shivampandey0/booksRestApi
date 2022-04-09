const mongoose = require("mongoose");

//Author Schema
const AuthorScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  age: {
    type: Number,
    min: 10,
    max: 100,
  },
});

module.exports = new mongoose.model("Author", AuthorScheme);
