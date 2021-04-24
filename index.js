const http = require('http'),
logger = require('morgan'),
cors = require('cors'),
express = require('express'),
bodyParser = require('body-parser');

var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use(logger('tiny'));

app.get ('/hello', (req, res) => {
    res.write("Test");
    res.write(users.join('\n'));
});

 app.listen(port, function(err){
    console.log('Listening on port: ' + port);
});