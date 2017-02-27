var router = require('express').Router();
var Style = require('../models/style.model');

router.route('/')
//.all()
.get(getAll)
.post(createOne);

router.route('/id/:styleId')
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
    lean: true,
    offset: parseInt(req.query.offset),
    limit: parseInt(req.query.limit)
  };

  Style.paginate(query, options)
  .then( styles => res.status(200).json(styles) )
  .catch( err => res.status(500).json(err) );

}


function createOne(req, res, next) {
  Style.create(req.body, function(err, style) {
    if (err) return res.status(400).json(err);
    res.status(201).json(style);
  });
}

function getOne(req, res, next) {
  Style.findById(req.params.styleId).exec((err, style) => {
    if (err) return res.status(400).json(err);
    if (!style) return res.status(404).json();
    res.status(200).json(style);
  });
}

function updateOne(req, res, next) {
  Style.findOneAndUpdate({ id: req.params.styleId }, req.body, function(err, style) {
    if (err) return res.status(400).json(err);
    if (!style) return res.status(404).json();
    res.status(200).json(style);
  });
}

function deleteOne(req, res, next) {
  Style.findOneAndRemove({ id: req.params.styleId }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
