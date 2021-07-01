const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config()
// const authenticate = require('./authenticate');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;


const connect = mongoose.connect(MONGO_URI, ({useNewUrlParser: true, useUnifiedTopology: true }));
connect.then(() => {
    console.log("Connected to database");
}, (err) => { console.log(err); });

const app = express();

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require("socket.io")(server);

app.use(cors())

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use('/users', require('./routes/User.routes'));
app.use('/posts', require('./routes/Post.routes'));
app.use('/messages', require('./routes/Message.routes'));
app.use('/company', require('./routes/Company.routes'));

// app.use(express.static(path.join(__dirname, 'public')));











