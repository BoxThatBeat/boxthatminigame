var localStorage = {};

exports.socketIdUsernames = socketIdUsernames = {

  set : function(key, value){
    localStorage[key] = value;
    console.log('after set: ' + localStorage);
    for (var key in localStorage) {
      console.log(key + ": " + localStorage[key]);
    }
  },
  get : function(key){
    return localStorage[key];
  },
  delete : function(key){
    delete localStorage[key];
    console.log('after delete: ');
    for (var key in localStorage) {
      console.log(key + ": " + localStorage[key]);
    }
  },
  all : function(){
    return localStorage;
  }
};