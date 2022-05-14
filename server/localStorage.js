var socketIdUsernamesObj = {};
var roomsObj = {}

// { socketId1: username1, socketId2: username2 }
exports.socketIdUsernames = socketIdUsernames = {

  set : function(key, value){
    socketIdUsernamesObj[key] = value;
    console.log('after set: ');
    for (var key in socketIdUsernamesObj) {
      console.log(key + ": " + socketIdUsernamesObj[key]);
    }
  },
  get : function(key){
    return socketIdUsernamesObj[key];
  },
  delete : function(key){
    delete socketIdUsernamesObj[key];
    console.log('after delete: ');
    for (var key in socketIdUsernamesObj) {
      console.log(key + ": " + socketIdUsernamesObj[key]);
    }
  },
  all : function(){
    return socketIdUsernamesObj;
  }
};

// { uuid1: [socketId1, socketId2], uuid2: [socketId1, socketId2] }
/*exports.rooms = rooms = {

  set : function(key, value){
    roomsObj[key] = value;
    console.log('Rooms after set: ');
    for (var key in roomsObj) {
      console.log(key + ": " + roomsObj[key]);
    }
  },
  get : function(key){
    return roomsObj[key];
  },
  delete : function(key){
    delete roomsObj[key];
    console.log('Rooms after delete: ');
    for (var key in roomsObj) {
      console.log(key + ": " + roomsObj[key]);
    }
  },
  all : function(){
    return roomsObj;
  }
};*/