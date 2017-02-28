var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var amazonItemSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  asin: String,
  url: { type: String, required: true },
  small_image: { type: String, default: '' }, 
  medium_image: { type: String, default: '' },
  large_image: { type: String, default: '' },
  bindings: [String],
  brand: { type: String, default: '' },
  size: { type: String, default: '' },
  title: { type: String,  required: true },
  description: { type: String, default: '' },
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  usedInStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

amazonItemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('AmazonItem', amazonItemSchema);
