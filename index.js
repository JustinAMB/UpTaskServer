const express = require('express');
const app = express();
const db = require('./db');
const dotenv = require('dotenv');
dotenv.config({ path: "variables.env" });
app.set('port', process.env.PORT || 73);
app.listen(app.get('port'), () => { console.log(app.get('port')); });