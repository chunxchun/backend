var router = require('express').Router();
var Item = require('../models/item.model');

router.route('/')
//.all()
.get(getAll)
.post(createOne);

router.route('/id/:itemId')
//.all()
.get(getOne)
.put(updateOne)
.delete(deleteOne);

module.exports = router;

function getAll(req, res, next) {
  var query = {};
  var options = {
    sort: { lastEditDate: -1 },
    //select: 'email',
    lean: true, // return plain javascript object, not mongoose doc -> performance
    offset: parseInt(req.query.offset),
    limit: parseInt(req.query.limit)
  };

  Item.paginate(query, options)
  .then( items => res.status(200).json(items) )
  .catch( err => res.status(500).json(err) );

}


function createOne(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) return res.status(400).json(err);
    res.status(201).json(item);
  });
}

function getOne(req, res, next) {
  User.findById(req.params.itemId).exec((err, item) => {
    if (err) return res.status(400).json(err);
    if (!item) return res.status(404).json();
    res.status(200).json(item);
  });
}

function updateOne(req, res, next) {
  Item.findOneAndUpdate({ id: req.params.itemId }, req.body, function(err, item) {
    if (err) return res.status(400).json(err);
    if (!item) return res.status(404).json();
    res.status(200).json(item);
  });
}

function deleteOne(req, res, next) {
  Item.findOneAndRemove({ id: req.params.itemId }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
