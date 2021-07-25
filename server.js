require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/route'));

require('./services/connectionBD');

app.listen(process.env.PORT, (err) => err ? console.log('something went wrong.') : console.log('server online.'));