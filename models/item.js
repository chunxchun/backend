var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var itemSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: { unique: true } },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  usedInStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
});

itemSchema.plugin(generateId());
module.exports = mongoose.model('Item', itemSchema);
