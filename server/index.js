require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes');

const app = express();
app.use(compression());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('client', 'dist')));

app.use('/api', router);
app.get('*', (req, res) => res.sendFile(path.resolve('client', 'dist', 'index.html')));

module.exports = app;
