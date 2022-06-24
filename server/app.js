var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const Sequelize = require('sequelize');
require('dotenv').config()

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize SQL Database
const db = require("./sequelize_init");
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync()
.then(() => {
  console.log(`Database & tables created!`);
});


var http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);


// Initialize SocketIO and setup listenners and emitters
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

const Response = require('./models/Response');
const User = require('./models/user')(db.sequelize, Sequelize.DataTypes, Sequelize.Model);

const localStorage = require('./localStorage');

// Socket IO handling

io.on("connection", socket => {

  /**
 * Socket handlers
 */
 const { register, login, logout, getUsernames, getOnlineUsernames } = require("./socket_controllers/userController")(socket, io, localStorage, User, Response);
 const { inviteUser, joinUser, leaveGame} = require("./socket_controllers/gameController")(socket, io, localStorage, User, Response);
 const { transferInput } = require("./socket_controllers/countingManiaController")(socket, io, localStorage, User, Response);

 /*
  let previousId;

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };
  */

  // Ask client if they are signed in and update username to use new socketId
  socket.emit('connection:new', (username) => {
    if (username != null) {
      localStorage.socketIdUsernames.delete(username);
      localStorage.socketIdUsernames.set(username, socket.id);
    }
  });

  // Listenners
  socket.on("user:register", register);
  socket.on("user:login", login);
  socket.on("user:logout", logout);
  socket.on('user:allusers', getUsernames);
  socket.on('user:onlineusers', getOnlineUsernames);

  socket.on('game:inviteuser', inviteUser);
  socket.on('game:joinuser', joinUser);
  socket.on('game:leavegame', leaveGame)

  socket.on('countingmania:sendInput', transferInput);

  /*
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
*/
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}