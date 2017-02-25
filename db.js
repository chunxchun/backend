var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'mongodb://chunxchun:faby_test_db611@ds161159.mlab.com:61159/faby_test_db';

module.exports = function(app) {
  mongoose.connect(mongoUrl, {
    mongoose: { safe: true }
  }, function(err) {
    if (err) {
      return console.log('Mongoose - connection error:', err);
    }
  });

  return mongoose;
};
