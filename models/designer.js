var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var designerSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: true },
  followedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

designerSchema.plugin(generateId());
module.exports = mongoose.model('Designer', designerSchema);
