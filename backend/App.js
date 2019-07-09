const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const controller = require('./controller');


app = express()
port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);