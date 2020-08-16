const express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));

// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', message: "Hello There"})
})

app.get('/about', (req, res) => {
    res.render('about')
})

// establish a connection to local mongodb database
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const mongoUri = "mongodb://localhost:27017/test";
mongoose.connect(mongoUri, {useUnifiedTopology: true, useNewUrlParser: true});

