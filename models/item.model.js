var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var itemSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  likedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  usedInStyles: [{ type: mongoose.Schema.ObjectId, ref: 'Style'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', itemSchema);
