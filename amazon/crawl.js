var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: 'AKIAJ6MUBGDDACBPPCJA',
  awsSecret: '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',
  awsTag: 'chunxchun-20'
});

module.exports = client;

/*
  var SERVICE = 'AWSECommerceService';
  var ASSOCIATE_TAG = 'chunxchun-20'; // associate programme
  var ENDPOINT = 'webservices.amazon.com'; // US marketplace
  var AWS_ACCESS_KEY_ID = 'AKIAJ6MUBGDDACBPPCJA';
  var AWS_SECRET_KEY = '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';
  */