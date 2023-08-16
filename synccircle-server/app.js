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
    key: fs.readFileSync('/etc/letsencrypt/live/your_domain.com/privkey.pem'), // Update the path to your private key
    cert: fs.readFileSync('/etc/letsencrypt/live/your_domain.com/fullchain.pem') // Update the path to your full chain certificate
};

const server = https.createServer(sslOptions, app); // Create an HTTPS server

const { Server } = require("socket.io");
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

server.listen(443, () => { // Start the server on port 443 (HTTPS)
    console.log('Listening on port 443');
});