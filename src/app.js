const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

// import
const connectDB = require('./config/dbconfig');
const router = require('./routers/Router');
const sendMsg = require('./services/socket');
const {initSocket} = require('./services/socket');

// socket.io
const server = require('http').createServer(app);
const io = initSocket(server);



// view engine
app.set('view engine', 'ejs');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('public'));


connectDB();



module.exports = {server};


