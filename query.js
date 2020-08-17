/* 
    Developing Full stack apps with Node(Express) and MongoDB

    Node eco-system is a realtvily new set of programming languages to write full-stack apps in JavaScript.
    Node: is a javaScritp runtime machine, it allows you to write and run javaScript apps outsie of browser, and you can build webservers with node

    Express, is a javaScript Library to develop full-stack apps with node

    MongoDB is a no SQL Database managment system, the data structure of mongoDB is similar to JSON, but the only difference is mongoDB is a binary data strucute and it's called BSON.

    Mongoose, is a stand alone node package to enteract with mongoDB from Express of Node app
*/

// We need 2 main packages for this stack
const mongoose = require('mongoose');  // to enteract with database
const Schema = mongoose.Schema; // to create Schemas for database documents
require('dotenv').config(); // to read environment variables from .env


/*==========================================
    1) Install and Setup
        1. install mongoose package
        2. define mongodb uri in the .env file
        3. connect to database with .connect()
==============================================*/
const mongo_uri = process.env.MONGO_URI_LOCAL;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});

