press = require('express');
var router = express.Router();
var styles = require('./../handlers/style');

router.route('/styles')
.get(styles.getAll)
.post(styles.createOne);

router.route('/styles/:id')
.get(styles.getOne)
.put(styles.updateOne)
.delete(styles.deleteOne);

module.exports = router;
