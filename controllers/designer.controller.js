var router = require('express').Router();
var Designer = require('../models/designer.model');

router.route('/')
//.all()
.get(getAll)
.post(createOne);

router.route('/id/:designerId')
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

  Designer.paginate(query, options)
  .then( designers => res.status(200).json(designers) )
  .catch( err => res.status(500).json(err) );

}


function createOne(req, res, next) {
  Designer.create(req.body, function(err, designer) {
    if (err) return res.status(400).json(err);
    res.status(201).json(designer);
  });
}

function getOne(req, res, next) {
  Designer.findById(req.params.designerId).exec((err, designer) => {
    if (err) return res.status(400).json(err);
    if (!designer) return res.status(404).json();
    res.status(200).json(designer);
  });
}

function updateOne(req, res, next) {
  Designer.findOneAndUpdate({ id: req.params.designerId }, req.body, function(err, designer) {
    if (err) return res.status(400).json(err);
    if (!designer) return res.status(404).json();
    res.status(200).json(designer);
  });
}

function deleteOne(req, res, next) {
  Designer.findOneAndRemove({ id: req.params.designerId }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
