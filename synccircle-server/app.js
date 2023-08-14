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
const { group } = require('console');
//const { Socket } = require('dgram');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('unbooked', (matrixKey, groupId) => {
        io.emit('unbooked', matrixKey, groupId);
    } )

    socket.on('booked', (matrixKey, groupId) => {
        io.emit('booked', matrixKey, groupId);
    })

    socket.on('new user', (groupId) => {
        io.emit('new user', groupId);
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