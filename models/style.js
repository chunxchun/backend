var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var styleSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: { unique: true } },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  consistingItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item'}],
});

styleSchema.plugin(generateId());
module.exports = mongoose.model('Style', styleSchema);
