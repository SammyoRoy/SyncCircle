const express = require('express');
const { connectToDb} = require('./db');

const groupRoutes = require('./groups/routes');
const userRoutes = require('./users/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/groups', groupRoutes);
app.use('/users', userRoutes);

connectToDb((err) => {
    if (err) {
        console.log('Unable to connect to database');
        process.exit(1);
    } else {
        app.listen(4000, () => {
            console.log('Connected to database, listening on port 4000');
        });

    }
});

app.get('/', (req, res) => {
    res.send('Easter Egg');
});

