var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var designerSchema = new mongoose.Schema({
  //id: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: true },
  followedByUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  createDate: { type: Date, default: Date.now },
  lastEditDate: { type: Date, default: Date.now }
});

designerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Designer', designerSchema);
