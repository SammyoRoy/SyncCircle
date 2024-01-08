// Commented out code is for encrypted production version of backend
const express = require('express');
const https = require('https'); // Import the 'https' module
const fs = require('fs'); // Import the 'fs' module for reading the SSL certificate and key files
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

// Read the SSL certificate and key files
const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/backend.synccircle.net/privkey.pem'), // Update the path to your private key
    cert: fs.readFileSync('/etc/letsencrypt/live/backend.synccircle.net/fullchain.pem') // Update the path to your full chain certificate
};

const server = https.createServer(sslOptions, app); // Create an HTTPS server
//const server = https.createServer(app); // Create an HTTPS server

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    
    
    socket.on('unbooked', (row, col, groupId) => {
        io.emit('unbooked', row, col, groupId);
    });

    socket.on('booked', (row, col, groupId) => {
        io.emit('booked', row, col, groupId);
    });

    socket.on('new user', (groupId) => {
        io.emit('new user', groupId);
    });

    socket.on('disconnect', () => {
        
    });
});

app.get('/', (req, res) => {
    res.send('Easter Egg');
});

server.listen(443, () => { // Start the server on port 443 (HTTPS)
    
});


/*
const express = require('express');
const http = require('http'); // Import the 'http' module
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

const server = http.createServer(app); // Create an HTTP server
const io = require('socket.io')(server); // Pass the HTTP server instance to Socket.IO

io.on('connection', (socket) => {
    
    
    socket.on('unbooked', (row, col, groupId) => {
        io.emit('unbooked', row, col, groupId);
    });

    socket.on('booked', (row, col, groupId) => {
        io.emit('booked', row, col, groupId);
    });

    socket.on('new user', (groupId) => {
        io.emit('new user', groupId);
    });

    socket.on('disconnect', () => {
        
    });
});

app.get('/', (req, res) => {
    res.send('Easter Egg');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    
});
*/