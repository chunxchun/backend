var router = require('express').Router();
var amazonClient = require('./crawl');
var AmazonItem = require('./item.model');

router.route('/items')
//.all()
.get(getAll);

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