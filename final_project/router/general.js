const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Hàm giả lập bất đồng bộ để đáp ứng yêu cầu dùng Promise/Async-Await của bài lab
const getBooks = () => {
    return new Promise((resolve) => resolve(books));
};

// 1. Lấy danh sách tất cả sách
public_users.get('/', async (req, res) => {
    try {
        const allBooks = await getBooks();
        res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// 2. Lấy sách theo ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const allBooks = await getBooks();
        const book = allBooks[isbn];
        if (book) {
            res.status(200).send(JSON.stringify(book, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
});

// 3. Lấy sách theo Tác giả
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const allBooks = await getBooks();
        const booksByAuthor = Object.values(allBooks).filter(book => book.author === author);
        if (booksByAuthor.length > 0) {
            res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author" });
    }
});

// 4. Lấy sách theo Tiêu đề
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const allBooks = await getBooks();
        const booksByTitle = Object.values(allBooks).filter(book => book.title === title);
        if (booksByTitle.length > 0) {
            res.status(200).send(JSON.stringify(booksByTitle, null, 4));
        } else {
            res.status(404).json({ message: "Title not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});

// 5. Lấy review theo ISBN
public_users.get('/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const allBooks = await getBooks();
        if (allBooks[isbn]) {
            res.status(200).send(JSON.stringify(allBooks[isbn].reviews, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

module.exports.general = public_users;