const express = require('express');
const app = express();
const db = require('./db');
const dotenv = require('dotenv');
dotenv.config({ path: "variables.env" });
app.use(express.json());
db.authenticate()
    .then(() => console.log("sirve"))
    .catch(error => console.log(error))
app.set('port', process.env.PORT || 73);


app.use('/api/User', require('./routes/user'));
app.listen(app.get('port'), () => { console.log(app.get('port')); });