

module.exports = (socket, io, localStorage, User, Response) => {

  const transferInput = function(request) {

    const [,roomId] = socket.rooms;
    socket.to(roomId).emit('countingmania:recieveinput', new Response({'input': request.payload.input}, false));
  }
  
  return {
    transferInput
  }
}