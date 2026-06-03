const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Route 1: Lấy danh sách tất cả sách
public_users.get('/', async (req, res) => {
    try {
        res.status(200).send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

// Route 2: Lấy sách theo ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.status(200).send(JSON.stringify(book, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Route 3: Lấy sách theo Tác giả (Logic lọc bắt buộc)
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    const booksArray = Object.values(books);
    const filtered = booksArray.filter(book => book.author === author);
    if (filtered.length > 0) {
        res.status(200).send(JSON.stringify(filtered, null, 4));
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

// Route 4: Lấy sách theo Tiêu đề (Logic lọc bắt buộc)
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    const booksArray = Object.values(books);
    const filtered = booksArray.filter(book => book.title === title);
    if (filtered.length > 0) {
        res.status(200).send(JSON.stringify(filtered, null, 4));
    } else {
        res.status(404).json({ message: "Title not found" });
    }
});

// Route 5: Lấy review theo ISBN
public_users.get('/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;