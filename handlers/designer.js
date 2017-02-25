var Designer = require('../models/designer');

module.exports = {

  getAll: getAll,
  createOne: createOne,
  getOne: getOne,
  updateOne: updateOne,
  deleteOne: deleteOne

};

function getAll(req, res, next) {
  Designer.find(function(err, designers) {
    if (err) return res.status(400).json(err);
    res.status(200).json(designers);
  });
}


function createOne(req, res, next) {
  Designer.create(req.body, function(err, designer) {
    if (err) return res.status(400).json(err);
    res.status(201).json(designer);
  });
}

function getOne(req, res, next) {
  Designer.findOne({ id: req.params.id }).populate().exec(function(err, designer) {
    if (err) return res.status(400).json(err);
    if (!designer) return res.status(404).json();
    res.status(200).json(designer);
  });
}

function updateOne(req, res, next) {
  Designer.findOneAndUpdate({ id: req.params.id }, req.body, function(err, designer) {
    if (err) return res.status(400).json(err);
    if (!designer) return res.status(404).json();
    res.status(200).json(designer);
  });
}

function deleteOne(req, res, next) {
  Designer.findOneAndRemove({ id: req.params.id }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
