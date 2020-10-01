'use strict'
console.clear()
const log = console.log

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { config } from 'dotenv'

// custom modules
import Person from './Schema.js'
import homeRoute from './server/homeRoute.js'
import userRoute from './server/userRoute.js'

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

// home route
homeRoute(app)
// user route
userRoute(Person, app)
