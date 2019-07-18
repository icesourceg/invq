const express = require('express');
const path = require("path")
const app = express();
const env = require('dotenv').config();
const routes = require('./routes');

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

app.set('view engine', 'ejs');

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'))

// Set the folder for css & java scripts
console.log( express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static('node_modules'));
routes(app);

const port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('server listening on port ' + port);
});