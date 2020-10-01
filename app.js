'use strict'
console.clear()
const log = console.log

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Person from './Schema.js'
import { config } from 'dotenv'

config()

const app = express()
const { MONGO_URI, PORT } = process.env

app.listen(PORT, () => log('Listening on ' + PORT))

// setup template engine
app.set('views', './views')
app.set('view engine', 'pug')

// serve static files
app.use(express.static(process.cwd() + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*==========================================
    2) CONNECT TO DB
==============================================*/

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(log('Conected to database'))

// create the home url
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Hello There' })
})

app.route('/person').post((req, res) => {
    const { name, age, fav_food } = req.body

    const newPerson = new Person({
        name: name,
        age: age,
        favFoods: fav_food,
    })

    newPerson
        .save(newPerson)
        .then((data) => res.json(data))
        .catch((err) => log(err))
})
