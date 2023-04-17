const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
// const cors = require('cors');
const path = require('path');


const app = express();


const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, })
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const studentRouter = require('./routes/students');
app.use('/students', studentRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
