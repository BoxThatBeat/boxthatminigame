module.exports = (io, User, Response) => {

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
      callback(new Response('User login succesful ' + user, false));
    }
  };

  const getUsernames = async function (callback) {

    const users = await User.findAll();

    if (users) {
      usernames = users.map(user => user.username);
      callback(new Response(usernames, false));
    }

    callback(new Response('No users registered', true));
  }

  return {
    register,
    login,
    getUsernames
  }
}