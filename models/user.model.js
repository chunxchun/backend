var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//var generateId = require('./plugins/generateId');

var userSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: true },
  likedItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item'}],
  likedStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
  followingDesigners: [{ type: mongoose.Schema.ObjectId, ref: 'Designer'}],
  followingUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  followedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

userSchema.plugin(mongoosePaginate);
//userSchema.plugin(generateId());
module.exports = mongoose.model('User', userSchema);
