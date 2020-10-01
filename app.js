'use strict'
console.clear()
const log = console.log

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const app = express()

app.listen(3000, () => console.log('Listening on 3000'))

// establish a connection to local mongodb database
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const mongoUri = 'mongodb://localhost:27017/test'
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })

// setup template engine
app.set('views', './views')
app.set('view engine', 'pug')

// serve static files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

// create the home url
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Hello There' })
})

app.get('/about', (req, res) => {
    res.render('about')
})

// seup a rout for person
app.get('/person', (req, res) => {
    res.render('person')
})

// create a collection with Schema
const personSchema = new Schema({
    name: String,
    age: Number,
    nationality: String,
})

// create a model from this schema
const Person = mongoose.model('Person', personSchema)

/*=========================
    CRUD - Create
=========================*/
const createAndSavePerson = (done) => {
    const jonDoe = new Person({ name: 'Jon Doe', age: 30, nationality: 'US' })
    jonDoe.save((err, data) => {
        if (err) done(err)
        done(null, data)
    })
}

// setup a post route handler to handle post requests to /person
app.post('/person', (req, res) => {
    let person = req.body

    // check if all of the filds are provied
    if (!person.name || !person.age || !person.nationality) {
        // res.send("Sorry, you provided wrong info")
        res.render('show_msg', {
            message: 'Sorry, you provided wrong data',
            type: 'error',
        })
    } else {
        let newPerson = new Person({
            name: person.name,
            age: person.age,
            nationality: person.nationality,
        })

        newPerson.save((err, data) => {
            if (err)
                res.render('show_msg', {
                    message: 'Database Error',
                    type: 'error',
                })
            else
                res.render('show_msg', {
                    message: 'New person added',
                    person: data,
                })
        })
    }
})

app.get('/people', (req, res) => {
    Person.find((err, response) => {
        // res.json(response);
        res.render('people', { people: response })
    })
})
