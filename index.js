const http = require('http'),
logger = require('morgan'),
cors = require('cors'),
express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use(logger('tiny'));
app.use(require('./routes'));

app.get ('/hello', (req, res) => {
    res.write("Test");
    res.write(users.join('\n'));
});

 mongoose.connect('mongodb://localhost/test');

 mongoose.connection.on('error', (err) => { 
     console.log('Mongodb Error: ', err); 
     process.exit();
 });
 mongoose.connection.on('connected', () => { 
     console.log('MongoDB is successfully connected');
 });

 app.listen(port, function(err){
    console.log('Listening on port: ' + port);
});