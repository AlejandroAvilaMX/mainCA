const express = require('express'),
router = express.Router();

itemCtrl = require('./catalog-controller');

//Routes that call all the methods to manipulate the information of the catalog of items
router.post('/items', itemCtrl.createItem);
router.get('/items', itemCtrl.getItems);
router.get('/items/:id', itemCtrl.getItem);
router.put('/items/:id', itemCtrl.updateItem);
router.delete('/items/:id', itemCtrl.deleteItem);

module.exports.UPLOAD_PATH = "uploads";     //This path will tell to multer where to upload the images

var multer = require("multer");             //Include the module multer
var upload = multer({ dest: module.exports.UPLOAD_PATH});           //Instance of the multer
var imageCtrl = require('./image-controller');                      //Provide the functionality

//Routes that call the methos to manipulate images
router.post('/images', upload.single('image'), imageCtrl.uploadImage);
router.get('/images', imageCtrl.getImages);
router.get('/images/:id', imageCtrl.getImage);
router.delete('/images/:id', imageCtrl.deleteImage);

module.exports = router;        //Make it available to the other files