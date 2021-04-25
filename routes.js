const express = require('express'),
router = express.Router();

itemCtrl = require('./catalog-controller');

//Routes that call all the methods to manipulate the information
router.post('/items', itemCtrl.createItem);
router.get('/items', itemCtrl.getItems);
router.get('/items/:id', itemCtrl.getItem);
router.put('/items/:id', itemCtrl.updateItem);
router.delete('/items/:id', itemCtrl.deleteItem);

module.exports.UPLOAD_PATH = "uploads";     //This path will tell to multer where to upload the images

var multer = require("multer");             //Include the module multer
var upload = multer({ dest: module.exports.UPLOAD_PATH});           //Instance of the multer
var imageCtrl = require('./image-controller');                      //Provide the functionality

module.exports = router;        //Make it available to the other files