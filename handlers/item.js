var Item = require('../models/item');

module.exports = {

  getAll: getAll,
  createOne: createOne,
  getOne: getOne,
  updateOne: updateOne,
  deleteOne: deleteOne

};

function getAll(req, res, next) {
  Item.find(function(err, items) {
    if (err) return res.status(400).json(err);
    res.status(200).json(items);
  });
}


function createOne(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) return res.status(400).json(err);
    res.status(201).json(item);
  });
}

function getOne(req, res, next) {
  Item.findOne({ id: req.params.id }).populate().exec(function(err, item) {
    if (err) return res.status(400).json(err);
    if (!item) return res.status(404).json();
    res.status(200).json(item);
  });
}

function updateOne(req, res, next) {
  Item.findOneAndUpdate({ id: req.params.id }, req.body, function(err, item) {
    if (err) return res.status(400).json(err);
    if (!item) return res.status(404).json();
    res.status(200).json(item);
  });
}

function deleteOne(req, res, next) {
  Item.findOneAndRemove({ id: req.params.id }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
