const http = require('http'),
logger = require('morgan'),
cors = requite('cors'),
express = require('express'),
bodyParser = require('body-parser');

var app = express();
var port = 8000;

http.createServer((req, res)=>{
    res.write("Hello World"); 
    res.end(); 
 }).listen(8000);