var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var userSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: true },
  likedItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item'}],
  likedStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
  followingDesigners: [{ type: mongoose.Schema.ObjectId, ref: 'Designer'}],
  followingUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
  followedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

userSchema.plugin(generateId());
module.exports = mongoose.model('User', userSchema);
