/* 
    Developing Full stack apps with Node(Express) and MongoDB

    Node eco-system is a realtvily new set of programming languages to write full-stack apps in JavaScript.
    Node: is a javaScritp runtime machine, it allows you to write and run javaScript apps outside of browser, and you can build webservers with node

    Express, is a javaScript Library to develop full-stack apps with node

    MongoDB is a no SQL Database managment system, the data structure of mongoDB is similar to JSON, but the only difference is mongoDB is a binary data strucute and it's called BSON.

    Mongoose, is a stand alone node package to enteract with mongoDB from Express of Node app
*/

// We need 2 main packages for this stack
const mongoose = require('mongoose') // to enteract with database
const Schema = mongoose.Schema // to create Schemas for database documents

/*==========================================
    2) Create Schema and Model

    MongoDB uses Collection as a table
    mongoose uses Schema to represetn a collection in the db

    - Person Prototype -
    --------------------
    name:           String
    age:            Number
    nationality:    String

    We Create a Schema based on Person Prototype
==============================================*/
const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: false,
    },

    age: {
        type: Number,
        default: 25,
    },

    favFoods: [String],
})

module.exports.Person = mongoose.model('Person', personSchema)
