var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: process.env.AWS_ACCESS_KEY_ID, 
  awsSecret: process.env.AWS_SECRET_KEY,
  awsTag: process.env.AWS_TAG
});

module.exports = client;
