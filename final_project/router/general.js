const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// 1. Đăng ký người dùng
public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
    if (username && password) {
        if (!users.find(user => user.username === username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        }
        return res.status(400).json({ message: "User already exists!" });
    }
    return res.status(400).json({ message: "Username and password are required" });
});

// 2. Lấy danh sách tất cả sách (Task 1)
public_users.get('/', function (req, res) {
    res.status(200).send(JSON.stringify(books, null, 4));
});

// 3. Lấy sách theo ISBN (Task 2)
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn], null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// 4. Lấy sách theo Tác giả (Task 3)
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    if (booksByAuthor.length > 0) {
        res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

// 5. Lấy sách theo Tiêu đề (Task 4)
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = Object.values(books).filter(book => book.title === title);
    if (booksByTitle.length > 0) {
        res.status(200).send(JSON.stringify(booksByTitle, null, 4));
    } else {
        res.status(404).json({ message: "Title not found" });
    }
});

// 6. Lấy review theo ISBN (Task 5)
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;