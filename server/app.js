var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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


var debug = require('debug')('server:server');
var http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);


// Initialize SocketIO and setup listenners and emitters
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const Response = require('./models/Response');
const User = require('./models/user')(db.sequelize, Sequelize.DataTypes, Sequelize.Model);

const localStorage = require('./localStorage');

io.on("connection", socket => {

  /**
 * Socket handlers
 */
 const { register, login, logout, getUsernames, getOnlineUsernames } = require("./socket_controllers/userController")(socket, io, localStorage, User, Response)
 const { inviteUser, joinUser } = require("./socket_controllers/gameController")(socket, io, localStorage, User, Response)

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
server.on('error', onError);
server.on('listening', onListening);


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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}