const express = require('express'),
router = express.Router();

itemCtrl = require('./catalog-controller');

router.post('/items', itemCtrl.createItem);
router.get('/items', itemCtrl.getItems);
router.get('/items/:id', itemCtrl.getItem);
//router.put('/items/:id', itemCtrl.updateItem);
//router.delete('/items/:id', itemCtrl.deleteItem);

module.exports = router;