const express = require("express");
const cors = require('cors');
const DB_data = require('./data.json');

const app = express();
const port = 5000;

// Setting up Views
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(cors());

app.get('/', (req, res) => res.send("Hello!"));

//  @route   GET /books
//  @desc    retrieves all the collections of books
//  @access   Public
app.get('/books', (req, res) => {
    const { Books } = DB_data;
    res.send(Books);
})


//  @route   GET /books/name/:name
//  @desc    retrieves the specific book queried by name
//  @access   Public
app.get('/books/name/:name', function (req, res) {
    const { Books } = DB_data;
    const name = req.params.name;
    let response;
    let re = Books.find(book => book.title.toLowerCase() === name.toLowerCase());
    re ? response = re : response = { "error": "Book not found" };
    res.send(response);
});

//  @route   GET /books/genre/:genre
//  @desc    retrieves the collections of books specific to the queried genre
//  @access   Public
app.get('/books/genre/:genre', function (req, res) {
    const { Books } = DB_data;
    const genre = req.params.genre;
    let response = [];
    Books.map((book) => {
        book.genre.toLowerCase() === genre.toLowerCase() ? response.push(book) : null
    })
    response.length === 0 ? response = { "error": "Genre doesn't exist in database" } : null;
    res.send(response);
});


//  @route   GET /books/
//  @desc    retrieves the collections of books specific to queried author
//  @access   Public
app.get('/books/author/:author', function (req, res) {
    const { Books } = DB_data;
    const { author } = req.params;
    let response = [];
    Books.map((book) => {
        book.author[0].toLowerCase() === author.toLowerCase() ? response.push(book) : null
    })
    response.length === 0 ? response = { "error": "Author doesn't exist in database" } : null;
    res.send(response);
});

//  @route   GET /books/author/:author/genre/:genre
//  @desc    retrieves the collections of books specific to queried author and genre
//  @access   Public
app.get('/books/author/:author/genre/:genre', function (req, res) {
    const { Books } = DB_data;
    const { author, genre } = req.params;
    let response = [];
    Books.map((book) => {
        book.genre.toLowerCase() === genre.toLowerCase() && book.author[0].toLowerCase() === author.toLowerCase() ? response.push(book) : null
    })
    response.length === 0 ? response = { "error": "No records were matched in database" } : null;
    res.send(response);
});

app.listen(port, () => {
    console.log(`I am running in port ${port}`);
})