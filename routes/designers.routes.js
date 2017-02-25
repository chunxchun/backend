var express = require('express');
var router = express.Router();
var designers = require('./../handlers/designer');

router.route('/designers')
.get(designers.getAll)
.post(designers.createOne);

router.route('/designers/:id')
.get(designers.getOne)
.put(designers.updateOne)
.delete(designers.deleteOne);


module.exports = router;
