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

/*
exports.updateUser = function(req, res) {
  User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, users) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(users);
  }); 
};

exports.deleteUser = function(req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function (err, users) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(users);
  }); 
};*/