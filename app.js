/* This code was taken from Mikhail's classes */
var http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'), //The path module provides utilities for working with file and directory paths
    express = require('express'), //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
    fs = require('fs'), //This module allows to work witht the file system: read and write files back
    xmlParse = require('xslt-processor').xmlParse, //This module allows us to work with XML files
    xsltProcess = require('xslt-processor').xsltProcess, //The same module allows us to utilise XSL Transformations
    xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

var router = express(); //We set our routing to be handled by Express
var server = http.createServer(router); //This is where our server gets created

//This makes our router able to see the CSS nad JavaScript files
router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({ extended: true })); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) { //We passed the name of the file (UltraVision)
    var filepath = path.normalize(path.join(__dirname, filename)); //First we get the name of the file (UltraVision)
    fs.readFile(filepath, 'utf8', function (err, xmlStr) {
        if (err) throw (err);  //If something goes wrong
        xml2js.parseString(xmlStr, {}, cb);  //Parsing xml to json using parseString
    });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);  //Writes on the same file (UltraVision.xml)
}

//In order to start the index file that we have, we had created another route that points back to the route of the website
router.get('/', function (req, res) {  //.get is the http method of requesting a page and '/' is the path (the route of our website), req is request and res is response

    res.render('index'); //New function

});

//Setting the route of our website
router.get('/get/html', function (req, res) { //.get is the http method of requesting a page and '/' is the path (the route of our website), req is request and res is response

    res.writeHead(200, { 'Content-Type': 'text/html' }); //We are responding to the client that the content served back is HTML and the it exists (code 200)

    var xml = fs.readFileSync('UltraVision.xml', 'utf8'); //We are reading in the XML file
    var xsl = fs.readFileSync('UltraVision.xsl', 'utf8'); //We are reading in the XSL file

    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //This does our XSL Transformation

    res.end(result.toString()); //Send the result back to the user, but convert to type string first

});

//Code to Add new Items
router.post('/post/json', function (req, res) {  //New post function

    function appendJSON(obj) {

        console.log(obj)  //This will only print on the console
        //We will do the conversion first
        xmlFileToJs('UltraVision.xml', function (err, result) {
            if (err) throw (err);

            result.catalog.section[obj.sec_n].entree.push({ 'item': obj.item, 'price': obj.price });  //We have to go to the section in my catalog first, grabing the objet (submenu).section number, then in the entree we push a new item and a new price
            console.log(JSON.stringify(result, null, "  ")); //This will only print on the console

            //Writing back in the .xml file
            jsToXmlFile('UltraVision.xml', result, function (err) {  //Conversion back from the .xml
                if (err) console.log(err);  //Print on the console any error
            });
        });
    };

    appendJSON(req.body);  //Calls the functions

    res.redirect('back');  //Goes back to the original page

});

//Code to Delete a selected Item
router.post('/post/delete', function (req, res) {  //New Delete function

    function deleteJSON(obj) {

        console.log(obj)  //This will only print on the console

        xmlFileToJs('UltraVision.xml', function (err, result) {
            if (err) throw (err);

            delete result.catalog.section[obj.section].entree[obj.entree];  //Gets the result of the catalog, then takes the section (specific section), then the entree (specific entree)

            console.log(JSON.stringify(result, null, "  "));  //This will only print on the console

            //Writing back in the .xml file
            jsToXmlFile('UltraVision.xml', result, function (err) {  //Conversion back from the .xml
                if (err) console.log(err);  //Print on the console any error
            });
        });
    };

    deleteJSON(req.body);  //Calls the functions

    res.redirect('back');  //Goes back to the original page

});

//Creating the server that will listen on the specific port 
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address(); //This is the server address
    console.log("Server listnening at", addr.address + ":" + addr.port); //We are just printing on the console
});