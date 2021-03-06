'use strict';

const mongoose = require('mongoose');

// const connectionOptions = {
//     server: {
//       poolSize: process.env.POOL_SIZE
//     },
//     user: process.env.USER,
//     pass: process.env.PASSWORD
//   };

mongoose.connect("mongodb://127.0.0.1/test");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connection with database succeeded.');
});

exports.db = db;