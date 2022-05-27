require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const server = require('http')
const favicon = require('serve-favicon');
const socketIo = require('socket.io')(server)
require('./config/database');

// Require controllers here

//SocketIo port

const app = express();


app.use(logger('dev'));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth')); 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api', require('./routes/api/likes'));

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); 

});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
