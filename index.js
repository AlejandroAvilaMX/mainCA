//Those are the modules that our app will need
const http = require('http'),               //Provides the http functionality
logger = require('morgan'),                 //morgan is our logger
cors = require('cors'),                     //This allow us to do the cross side request
express = require('express'),               //Working with express
bodyParser = require('body-parser'),        //Working with body Parser
mongoose = require('mongoose');             //Allow us to connect to our Database 
dotenv = require("dotenv");                 //Working with dotenv

var app = express();                        //This is the module that allow us set and star the server 
var port = 8000;                            //This is the port
dotenv.config();                            //Specify tha we are going to work with our .env file

app.use(bodyParser.json());                 //To be able to wokr and parse the json data
app.use(logger('tiny'));
app.use(require('./routes'));               //To work with our routes independenly 

app.get ('/hello', (req, res) => {
    res.write("Test");
    res.write(users.join('\n'));
});

//mongoose.connect('mongodb://localhost/test');

//mongoose.connection.on('error', (err) => { 
//    console.log('Mongodb Error: ', err); 
//    process.exit();
//});
//mongoose.connection.on('connected', () => { 
//    console.log('MongoDB is successfully connected');
//});

//Conect our app using the defined port
app.listen(port, function(err){
    console.log('Listening on port: ' + port);
});

//Connect mongoose with MondgoDB
//const dbURI = "mongodb://localhost/test";       //Conect to MongoDB locally
const dbURI = process.env.DB_URL;       //Conect to MongoDB Atlas

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err)); 