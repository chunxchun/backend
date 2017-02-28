var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var amazonItemSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  asin: String,
  url: { type: String, required: true },
  image: {
    small: String,
    medium: String,
    large: String
  },
  bindings: [String],
  brand: String,
  size: String,
  title: String,
  description: String,
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  usedInStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

amazonItemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('AmazonItem', amazonItemSchema);
