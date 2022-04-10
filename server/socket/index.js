/*module.exports = (io) => {

    io.on('connection', socket => {

        console.log('new connection'); 
        
		socket.on('disconnect', () => console.log('disconnected')); 
		
	})
}

/* ex: (functions are from controllers)
io.on('connection', socket => {

        console.log('new connection');

		socket.on('fetchMovies', () => fetchMovies(socket));
        
        socket.on('addMovie', (data) => addMovie(socket, data));

        socket.on('updateMovie', (data) => updateMovie(socket, data));

        socket.on('deleteMovie', (id) => deleteMovie(socket, id));
        
		socket.on('disconnect', () => console.log('disconnected')); 
		
	})
    */