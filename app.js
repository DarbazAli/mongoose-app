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

// seup a rout for person
app.get('/person', (req, res) => {
    res.render('person');
})

// establish a connection to local mongodb database
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const mongoUri = "mongodb://localhost:27017/test";
mongoose.connect(mongoUri, {useUnifiedTopology: true, useNewUrlParser: true});

// create a collection with Schema
const personSchema = new Schema({
    name: String,
    age: Number,
    favFoods: [String]
})

// create a model from this schema
const Person = mongoose.model('Person', personSchema)


/*=========================
    CRUD - Create
=========================*/
const createAndSavePerson = done => {
    const jonDoe = new Person({name: "Jon Doe", age: 30, favFoods:["Fish", "Wine"]})
    jonDoe.save((err, data) => {
        if ( err ) done(err);
        done(null, data)
    })
}