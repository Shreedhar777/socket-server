import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';

// Setting Up the server
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});
 
io.on('connection', (socket: Socket) => {      //Listens for incoming socket connections.
  console.log('Client connected:', socket.id);

  socket.on('draw', (data: any) => { //Listens for the 'draw' event from the client.
    // Broadcast drawing data to all connected clients except the sender
    socket.broadcast.emit('draw', data);
  });
// Disconnect Handling
  socket.on('disconnect', () => { //Listens for the 'disconnect' event when a client disconnects.
    console.log('Client disconnected:', socket.id);
  });
});

//Starting the Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {         //Starts the server to listen on the specified port
  console.log(`Server is running on port ${PORT}`);
});
