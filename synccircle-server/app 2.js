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


app.get('/', (req, res) => {
    res.send('Easter Egg');
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});

