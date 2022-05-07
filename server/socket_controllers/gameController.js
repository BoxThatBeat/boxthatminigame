module.exports = (socket, localStorage, User, Response) => {

  const invite = function(request) {
    console.log(request.payload.invited + ' was invited by ' + request.payload.inviter);

    var invitedSocketId = localStorage.socketIdUsernames.get(request.payload.invited);
    socket.to(invitedSocketId).emit("game:invited", request.payload.inviter);
  }
  
  return {
    invite
  }
}