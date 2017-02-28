var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 8080;

require('./db')(app);

var itemRouter = require('./controllers/item.controller');
var styleRouter = require('./controllers/style.controller');
var designerRouter = require('./controllers/designer.controller');
var userRouter = require('./controllers/user.controller');
var amazonRouter = require('./amazon/route');

app.use('/api/items', itemRouter);
app.use('/api/styles', styleRouter);
app.use('/api/designers', designerRouter);
app.use('/api/users', userRouter);
app.use('/api/amazon', amazonRouter);

var AmazonItem = require('./amazon/item.model');
// var amazonCrawler;
// amazonCrawler.get(keywords, searchIndex, loop, save)
// e.g. amazonCrawler.get('nike', 'Fashion', 10, true)

// amazonCrawler.get()
var amazonClient = require('./amazon/crawl');
// call amazon api, each return 10 items
for (var i = 1; i <= 10; i++) {
  console.log('loop amz, now loop '+i);
  amazonClient.itemSearch({
    searchIndex: 'Fashion',
    brand: 'Nike',
    keywords: 'shorts',
    responseGroup: 'ItemAttributes, Images',
    itemPage: i,
  })
  .then( result => {
    for (var j = 0; j < result.length; j++) {
      console.log('result loop: '+j+', and ASIN: '+result[j].ASIN[0]);
      console.log('result loop: '+j+', and Title: '+result[j].ItemAttributes[0].Title[0]);
      // construct item
      
      var item = {
        asin: result[j].ASIN[0] || '',
        url: result[j].DetailPageURL[0] || '',
        //image: {
          //small: result[j].SmallImage[0].URL[0] || '',
          //medium: result[j].MediumImage[0].URL[0] || '',
          //large: result[j].LargeImage[0].URL[0] || '',
        //},
        //binding: result[j].ItemAttributes[0].Binding || '',
        //brand: result[j].ItemAttributes[0].Brand[0] || '',
        //size: result[j].ItemAttributes[0].Clothing[0] || '',
        title: result[j].ItemAttributes[0].Title[0] || '',
        //desciption: result[j].ItemAttributes[0].Feature[0]  || ''// use first item in the Feature array
      }
      // store item to database
      /*
      AmazonItem.create(item, (err, item) => {
        if(err) console.log(err);
        console.log('save amazon item (ASIN:'+item.asin+') success.');
      })
      */
    }
  })
  .catch( err => console.log(err) );
}



/*
console.log('require cron job');
var testJob = require('./tasks/index');
console.log('start cron job');
testJob.start();
console.log('started cron job');
*/

app.listen(port);
