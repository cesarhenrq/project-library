/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const { Book } = require("../models");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Book.find();

      const booksResponse = books.map((book) => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length,
      }));

      res.json(booksResponse);
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) {
        return res.json({ error: "missing required field title" });
      }

      const book = await Book.create({ title });
      res.json({
        _id: book._id,
        title: book.title,
      });
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      await Book.deleteMany({});
      res.json({ message: "complete delete successful" });
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = await Book.findById(bookid);
      if (!book) {
        return res.json({ error: "no book exists" });
      }
      res.json(book);
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        return res.json({ error: "missing required field comment" });
      }
      const book = await Book.findById(bookid);
      if (!book) {
        return res.json({ error: "no book exists" });
      }

      book.comments.push(comment);
      await book.save();
      res.json(book);
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const book = await Book.findById(bookid);
      if (!book) {
        return res.json({ error: "no book exists" });
      }
      await book.deleteOne();
      res.json({ message: "delete successful" });
    });
};
