var express = require('express');
var router = express.Router();
var items = require('./../handlers/item');

router.route('/items')
.get(items.getAll)
.post(items.createOne);

router.route('/items/:id')
.get(items.getOne)
.put(items.updateOne)
.delete(items.deleteOne);

module.exports = router;
