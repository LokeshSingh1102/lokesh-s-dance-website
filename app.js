const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Dancecontact', { useNewUrlParser: true });
const port = 80;

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phnum: String
});
var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

// ENDPOINT
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    console.log(myData)
    myData.save().then(() => {
        res.send("The data has been successfully saved to database")
    }).catch(() => {
        res.status(400).send("Unfortunately the data has not been saved to database")
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`the application started automatically on port ${port}`);
})