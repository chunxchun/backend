var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var styleSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  consistingItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

styleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Style', styleSchema);
