

module.exports = (socket, io, localStorage, User, Response) => {
  const { uuid } = require('uuidv4');

  const inviteUser = function(request) {
    console.log(request.payload.invited + ' was invited by ' + request.payload.inviter);

    var invitedSocketId = localStorage.socketIdUsernames.get(request.payload.invited);
    socket.to(invitedSocketId).emit("game:invited", new Response({ 'inviter': request.payload.inviter}, false));
  }

  const joinUser = function(request) {
    console.log(request.payload.accepter + ' accepted game invitation of ' + request.payload.inviter);
  
    var inviterSocketId = localStorage.socketIdUsernames.get(request.payload.inviter);
    
    //TODO: if a user's room is joined but they are already in a room, return error response

    var roomId = uuid();

    // add both socketIds to list associated with room
    localStorage.rooms.set(roomId, [socket.id, inviterSocketId]);

    var users = [request.payload.inviter, request.payload.accepter];

    // join both users to new room
    socket.join(roomId);
    lookupOtherSocket(inviterSocketId, roomId, users)
  }

  async function lookupOtherSocket(inviterSocketId, roomId, users) {
    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
      if (socket.id === inviterSocketId) {
        socket.join(roomId);
        break;
      }
    }

    io.to(roomId).emit('game:joined', new Response({'usernames': users}, false));
  }

  const leaveGame = function(request) {
    
  }
  
  return {
    inviteUser,
    joinUser
  }
}