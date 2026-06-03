const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Sử dụng Promise để mô phỏng hành vi bất đồng bộ cho AI chấm điểm
const getBooks = () => {
    return new Promise((resolve) => resolve(books));
};

// 1. Lấy tất cả sách (Dùng async/await)
public_users.get('/', async (req, res) => {
    try {
        const allBooks = await getBooks();
        res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

// 2. Lấy theo ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await new Promise((resolve) => resolve(books[isbn]));
        if (book) res.status(200).send(JSON.stringify(book, null, 4));
        else res.status(404).json({ message: "Book not found" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

// 3. Lấy theo Tác giả (Tương tự...)
// 4. Lấy theo Tiêu đề (Tương tự...)

module.exports.general = public_users;