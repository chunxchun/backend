var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL;
var options = {
  mongoose: { safe: true },
  server: {
    socketOptions: { keepAlive: 300000, connectTimoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimoutMS: 30000 }
  }
};


module.exports = function(app) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl, options).then(
    () => { console.log('mongodb connected.'); },
    (err) => { console.log('failed to connect to mongodb.'); }
  );
  return mongoose;
};
