const express = require('express'),
router = express.Router();

itemCtrl = require('./catalog-controller');

router.post('/items', itemCtrl.createItem);
router.get('/items', itemCtrl.getItems);

module.exports = router;