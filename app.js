const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); 
app.set("views", path.join(__dirname, "views"));

// ENDPOINT
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`the application started automatically on port ${port}`);
})