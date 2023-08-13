const express = require('express');
const connectToDb = require('./db');
const cors = require('cors');

const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');

connectToDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/groups', groupRoutes);
app.use('/users', userRoutes);

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//const { Socket } = require('dgram');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('unbooked', matrixKey => {
        io.emit('unbooked', matrixKey);
    } )

    socket.on('booked', matrixKey => {
        io.emit('booked', matrixKey);
    })

    socket.on('new user', () => {
        io.emit('new user');
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
});

app.get('/', (req, res) => {
    res.send('Easter Egg');
});

server.listen(4000, () => {
    console.log('Listening on port 4000');
});