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
