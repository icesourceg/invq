const express = require('express');
const path = require("path")
const app = express();
var routes = require('./routes');
routes(app);

app.set('view engine', 'ejs');

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'))

// Set the folder for css & java scripts
console.log( express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static('node_modules'));

const port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('server listening on port ' + port);
});