var Style = require('../models/style');

module.exports = {

  getAll: getAll,
  createOne: createOne,
  getOne: getOne,
  updateOne: updateOne,
  deleteOne: deleteOne

};

function getAll(req, res, next) {
  Style.find(function(err, styles) {
    if (err) return res.status(400).json(err);
    res.status(200).json(styles);
  });
}


function createOne(req, res, next) {
  Style.create(req.body, function(err, style) {
    if (err) return res.status(400).json(err);
    res.status(201).json(style);
  });
}

function getOne(req, res, next) {
  Style.findOne({ id: req.params.id }).populate().exec(function(err, style) {
    if (err) return res.status(400).json(err);
    if (!style) return res.status(404).json();
    res.status(200).json(style);
  });
}

function updateOne(req, res, next) {
  Style.findOneAndUpdate({ id: req.params.id }, req.body, function(err, style) {
    if (err) return res.status(400).json(err);
    if (!style) return res.status(404).json();
    res.status(200).json(style);
  });
}

function deleteOne(req, res, next) {
  Style.findOneAndRemove({ id: req.params.id }, function(err) {
    if (err) return res.status(400).json(err);
    res.status(204).json();
  });
}
