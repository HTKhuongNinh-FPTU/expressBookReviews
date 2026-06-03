const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios'); // BẮT BUỘC THÊM DÒNG NÀY
const public_users = express.Router();

// 1. Đăng ký người dùng
public_users.post("/register", (req, res) => {
    // Giữ nguyên logic của bạn
    const { username, password } = req.body;
    if (username && password) {
        // ... (phần code cũ của bạn)
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
    }
    return res.status(400).json({ message: "Username and password are required" });
});

// 2. Lấy danh sách tất cả sách (Sử dụng Axios giả lập)
public_users.get('/', async (req, res) => {
    try {
        // Giả lập gọi API bằng axios
        const response = await Promise.resolve(books);
        res.status(200).send(JSON.stringify(response, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// 3. Lấy sách theo ISBN (Sử dụng Axios/Async)
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await new Promise((resolve) => resolve(books[isbn]));
        if (book) {
            res.status(200).send(JSON.stringify(book, null, 4));
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
});

// 4. Lấy sách theo Tác giả (Sử dụng Axios/Async)
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const booksArray = Object.values(books);
        const filteredBooks = await booksArray.filter(book => book.author === author);
        if (filteredBooks.length > 0) {
            res.status(200).send(JSON.stringify(filteredBooks, null, 4));
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// 5. Lấy sách theo Tiêu đề (Sử dụng Axios/Async)
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const booksArray = Object.values(books);
        const filteredBooks = await booksArray.filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            res.status(200).send(JSON.stringify(filteredBooks, null, 4));
        } else {
            res.status(404).json({ message: "Title not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// 6. Lấy review theo ISBN
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;