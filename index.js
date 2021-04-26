//Those are the modules that our app will need
const http = require('http'),           //Provides the http functionality
logger = require('morgan'),             //morgan is our logger
cors = require('cors'),                 //This allow us to do the cross side request
express = require('express'),           //
bodyParser = require('body-parser'),
mongoose = require('mongoose');         //Allow us to connect to oyr Database 

var app = express();                                            //This is the module that allow us set and star the server 
var port = 8000;                                                //This is the port

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
const dbURI = "mongodb+srv://pass1234:pass1234@cluster0.4o0vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";       //Conect to MongoDB web

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err)); 