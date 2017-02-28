var router = require('express').Router();
var amazonClient = require('./amazon-client');
var AmazonItem = require('./item.model');

router.route('/items')
//.all()
.get(getAll)
.post(createOne);

router.route('/items/id/:itemId')
//.all()
.get(getOne)
.put(updateOne)
.delete(deleteOne);

router.route('/keyword/:keyword/searchIndex/:searchIndex/page/:page')
.get(fetch);

module.exports = router;

function getAll(req, res, next) {
  var query = {};
  var options = {
    sort: { lastEditDate: -1 },
    //select: 'email',
    lean: true,
    offset: parseInt(req.query.offset),
    limit: parseInt(req.query.limit)
  };

  AmazonItem.paginate(query, options)
  .then( items => res.status(200).json(items) )
  .catch( err => res.status(500).json(err) );
}

function fetch(req, res, next) {
  amazonClient.itemSearch({
    searchIndex: req.params.searchIndex || 'Fashion',
    brand: 'Nike',
    keywords: req.params.keyword,
    responseGroup: 'ItemAttributes, Images',
    itemPage: parseInt(req.params.page)
  })
  .then( result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch( err => console.log(err) );
}

function createOne(req, res, next) {
  AmazonItem.create(req.body, function(err, item) {
    if (err) return res.status(400).json(err);
    res.status(201).json(item);
  });
}

function getOne(req, res, next) {
  AmazonItem.findById(req.params.itemId).exec((err, item) => {
    if (err) return res.status(400).json(err);
    if (!item) return res.status(404).json();
    res.status(200).json(item);
  });
}

function updateOne(req, res, next) {
  AmazonItem.findOneAndUpdate({ id: req.params.itemId }, req.body, function(err, item) {
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
