module.exports = (io) => {
  
  const register = function (user, callback) {
    console.log('Socket (server-side): received message:', user);

    // call db

    callback({});
  };

  const login = function (creds, callback) {
    console.log('Socket (server-side): received message:', creds);

    // call db

    callback({});
  };

  return {
    register,
    login
  }
}