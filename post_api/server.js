const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = require('./routes/post');
const users = require('./routes/users');

const port = 8080 || process.env.port

app.use("/",(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type , Authorization');
    next();
});

app.use(bodyParser.json())

app.use('/api',router);
app.use('/user',users);

app.listen(port , ()=>{
    console.log("Server started at " + port);
})