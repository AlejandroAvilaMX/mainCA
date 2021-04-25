var Catalog = require('./models/catalog');

exports.createItem = function(req, res) { 
    var newitem = new Catalog(req.body);
    newitem.save(function (err, catalog) { 
        if (err) { 
            res.status (400).json(err);
        }

        res.json(catalog); 
    });
};

exports.getItems = function(req, res) {
  Catalog.find({}, function (err, catalog) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(catalog);
  }); 
};

exports.getItem = function(req, res) {
  Catalog.findOne({_id: req.params.id}, function (err, catalog) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(catalog);
  }); 
};

exports.updateItem = function(req, res) {
  Catalog.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, catalog) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(catalog);
  }); 
};

exports.deleteItem = function(req, res) {
  Catalog.findByIdAndRemove({_id: req.params.id}, function (err, catalog) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(catalog);
  }); 
};