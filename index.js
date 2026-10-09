const express = require('express');
const app = express()
const port = 3000
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const { connect } = require('http2');
const { Console } = require('console');

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_info'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected Successfully!');
    }
});

app.get('/movie', (req, res) => {
    const query = "SELECT * FROM movie";
    db.query(query, (err, result) => {
        if (err) {
            Console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/addmovie', (req, res) => {
    const { Movie_Name, Genre, Year, IMDb_Rating, Director_ID } = req.body;
    const query = "INSERT INTO movie (Movie_Name,Genre,Year,IMDb_Rating,Director_ID) VALUES (?,?,?,?,?)";
    db.query(query, [Movie_Name, Genre, Year, IMDb_Rating, Director_ID], (err, result) => {
        if (err) {
            // Console.log(err);
            res.send(err);
        } else {
            // res.json(result);
            res.send("Movie Added Successfully!");
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "first.html"));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})