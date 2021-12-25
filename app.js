/* eslint-disable node/no-path-concat */
/* eslint-disable semi */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
// const url = require('url');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(express.static(`${__dirname}/uploads`));
app.use(cors());

const router = require('./routes/index');

app.use('/api', router);

app.listen(3001, () => console.log('Server running on port 3000!'));
