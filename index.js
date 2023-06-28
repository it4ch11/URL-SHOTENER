const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');   
var flash = require('connect-flash');


const app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shortUrl');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}))
app.use(flash());




const shortUrlSchema = new mongoose.Schema({
    fullurl: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    note: {
        type: String,
    }
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);


app.get('/', async (req, res) => {
    res.render('first');
})

app.get('/search', async (req, res) => {
    res.render('second');
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});