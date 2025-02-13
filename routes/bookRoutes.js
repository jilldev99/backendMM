const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: "All fields are required" });
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;