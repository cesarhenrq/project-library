const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: Array, default: [] },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
