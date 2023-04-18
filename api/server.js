const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');



const app = express();
app.use(cors());

// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8000;
const studentRouter = require('./routes/students');


const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, })
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/api/v1/students', studentRouter);

app.use(express.static(path.join(__dirname, '../crud-react-app/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../crud-react-app/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})