module.exports = (socket, io, localStorage, User, Response) => {

  const register = async function (request, callback) {

    User.findOrCreate({ where: {
      username: request.payload.username,
      password: request.payload.password
      }
    }).then(function(newUser) {
      callback(new Response('Created user succesfully: ' + newUser, false));
    }).catch(function(err) {
      console.log('Error creating user: ' + err);
      callback(new Response('Failed to create user: ' + err, true));
    });
  };

  const login = async function (request, callback) {

    const user = await User.findOne({ where: { 
        username: request.payload.username,
        password: request.payload.password
       } 
      });

    if (user === null) {
      callback(new Response('Incorrect user or password.', true));
    } else {
      localStorage.socketIdUsernames.set(user.username, socket.id);
      callback(new Response('User login succesful ' + user, false));
      io.emit('otheruser:login', user.username);
    }
  };

  const logout = function(request) {
    localStorage.socketIdUsernames.delete(request.payload.username);
    io.emit('otheruser:logout', request.payload.username);
  }

  const getUsernames = async function (callback) {

    const users = await User.findAll();

    if (users) {
      usernames = users.map(user => user.username);
      callback(new Response(usernames, false));
    }

    callback(new Response('No users registered', true));
  }

  const getOnlineUsernames = function (callback) {

    var onlineUserames = Object.keys(localStorage.socketIdUsernames.all());

    callback(new Response(onlineUserames, false));
  }

  return {
    register,
    login,
    logout,
    getUsernames,
    getOnlineUsernames
  }
}