

module.exports = (socket, io, localStorage, User, Response) => {
  const { uuid } = require('uuidv4');

  const inviteUser = function(request) {
    console.log(request.payload.invited + ' was invited by ' + request.payload.inviter);

    var invitedSocketId = localStorage.socketIdUsernames.get(request.payload.invited);
    socket.to(invitedSocketId).emit("game:invited", new Response({ 'inviter': request.payload.inviter}, false));
  }

  const joinUser = async function(request) {
    console.log(request.payload.accepter + ' accepted game invitation of ' + request.payload.inviter);
  
    var inviterSocketId = localStorage.socketIdUsernames.get(request.payload.inviter);
    
    //TODO if a user's room is joined but they are already in a room, return error response

    var roomId = uuid();

    // Add both socketIds to list associated with room
    // localStorage.rooms.set(roomId, [socket.id, inviterSocketId]);

    var users = [request.payload.inviter, request.payload.accepter];

    var otherSocket = await lookupOtherSocket(inviterSocketId)
    
    // Put both sockets in one new room
    socket.join(roomId);
    otherSocket.join(roomId);

    // Notify all in new room that they joined a game (and what users are apart of it)
    io.to(roomId).emit('game:joined', new Response({'usernames': users}, false));
  }

  async function lookupOtherSocket(inviterSocketId) {
    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
      if (socket.id === inviterSocketId) {
        return socket;
      }
    }
  }

  const leaveGame = function(request) {

    // Notify all members of room that user has left. For all rooms socket is in.
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.leave(room);
        io.to(room).emit('game:userleft', new Response({'username': request.payload.username}, false));
      }
    }
  }
  
  return {
    inviteUser,
    joinUser,
    leaveGame
  }
}