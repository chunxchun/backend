require('dotenv').config();

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

//enable CORS
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use('/api/items', itemRouter);
app.use('/api/styles', styleRouter);
app.use('/api/designers', designerRouter);
app.use('/api/users', userRouter);
app.use('/api/amazon', amazonRouter);

// amazonCrawler(keywords, searchIndex, loop, saveToDatabase)
// e.g. amazonCrawler('nike', 'Fashion', 10, true)

var amazonCrawler = require('./amazon/amazon-crawler');
var crawlOptions = [
  { k: 'Accessories', s: 'FashionMen', l: 10, s: false },
  { k: 'Activewear', s: 'FashionMen', l: 10, s: false },
  { k: 'Bags', s: 'FashionMen', l: 10, s: false },
  { k: 'Blazers', s: 'FashionMen', l: 10, s: false },
  { k: 'Caps', s: 'FashionMen', l: 10, s: false },
  { k: 'Hoodies', s: 'FashionMen', l: 10, s: false },
  { k: 'Jackets', s: 'FashionMen', l: 10, s: false },
  { k: 'Jeans', s: 'FashionMen', l: 10, s: false },
  { k: 'Jackets', s: 'FashionMen', l: 10, s: false },
  { k: 'Joggers', s: 'FashionMen', l: 10, s: false },
  { k: 'Jumpers', s: 'FashionMen', l: 10, s: false },
  { k: 'Polo', s: 'FashionMen', l: 10, s: false },
  { k: 'Shirts', s: 'FashionMen', l: 10, s: false },
  { k: 'Shoes', s: 'FashionMen', l: 10, s: false },
  { k: 'Boots', s: 'FashionMen', l: 10, s: false },
  { k: 'Trainers', s: 'FashionMen', l: 10, s: false },
  { k: 'Sneakers', s: 'FashionMen', l: 10, s: false },
  { k: 'Shorts', s: 'FashionMen', l: 10, s: false },
  { k: 'Suits', s: 'FashionMen', l: 10, s: false },
  { k: 'Sunglasses', s: 'FashionMen', l: 10, s: false },
  { k: 'Swimwear', s: 'FashionMen', l: 10, s: false },
  { k: 'Trousers', s: 'FashionMen', l: 10, s: false },
  { k: 'Chinos', s: 'FashionMen', l: 10, s: false },
  { k: 'T-Shirts', s: 'FashionMen', l: 10, s: false },
  { k: 'Vests', s: 'FashionMen', l: 10, s: false },
  { k: 'Underwear', s: 'FashionMen', l: 10, s: false },
  { k: 'Socks', s: 'FashionMen', l: 10, s: false },
  { k: 'Watches', s: 'FashionMen', l: 10, s: false },

  { k: 'Accessories', s: 'FashionWomen', l: 10, s: false },
  { k: 'Activewear', s: 'FashionWomen', l: 10, s: false },
  { k: 'Bags', s: 'FashionWomen', l: 10, s: false },
  { k: 'Purses', s: 'FashionWomen', l: 10, s: false },
  { k: 'Beauty', s: 'FashionWomen', l: 10, s: false },
  { k: 'Coats', s: 'FashionWomen', l: 10, s: false },
  { k: 'Jackets', s: 'FashionWomen', l: 10, s: false },
  { k: 'Denim', s: 'FashionWomen', l: 10, s: false },
  { k: 'Dresses', s: 'FashionWomen', l: 10, s: false },
  { k: 'Hoodies', s: 'FashionWomen', l: 10, s: false },
  { k: 'Jeans', s: 'FashionWomen', l: 10, s: false },
  { k: 'Jewellery', s: 'FashionWomen', l: 10, s: false },
  { k: 'Watches', s: 'FashionWomen', l: 10, s: false },
  { k: 'Jumpers', s: 'FashionWomen', l: 10, s: false },
  { k: 'Cardigans', s: 'FashionWomen', l: 10, s: false },
  { k: 'Jumpsuits', s: 'FashionWomen', l: 10, s: false },
  { k: 'Playsuits', s: 'FashionWomen', l: 10, s: false },
  { k: 'Lingerie', s: 'FashionWomen', l: 10, s: false },
  { k: 'Loungewear', s: 'FashionWomen', l: 10, s: false },
  { k: 'Maternity', s: 'FashionWomen', l: 10, s: false },
  { k: 'Shirts', s: 'FashionWomen', l: 10, s: false },
  { k: 'Blouses', s: 'FashionWomen', l: 10, s: false },
  { k: 'Shoes', s: 'FashionWomen', l: 10, s: false },
  { k: 'Skirts', s: 'FashionWomen', l: 10, s: false },
  { k: 'Socks', s: 'FashionWomen', l: 10, s: false },
  { k: 'Tights', s: 'FashionWomen', l: 10, s: false },
  { k: 'Sunglasses', s: 'FashionWomen', l: 10, s: false },
  { k: 'Swimwear', s: 'FashionWomen', l: 10, s: false },
  { k: 'Beachwear', s: 'FashionWomen', l: 10, s: false },
  { k: 'T-Shirts', s: 'FashionWomen', l: 10, s: false },
  { k: 'Vests', s: 'FashionWomen', l: 10, s: false },
  { k: 'Tops', s: 'FashionWomen', l: 10, s: false },
  { k: 'Trousers', s: 'FashionWomen', l: 10, s: false },
  { k: 'Leggings', s: 'FashionWomen', l: 10, s: false },
  { k: 'Suits', s: 'FashionWomen', l: 10, s: false }
]

var options = [
  { k: 'Accessories', s: 'FashionMen', l: 10, s: true },
  { k: 'Activewear', s: 'FashionMen', l: 10, s: true },
  { k: 'Bags', s: 'FashionMen', l: 10, s: true },
];

//amazonCrawler('Vests', 'FashionWomen', 10, true);
//amazonCrawler('Shirts', 'FashionWomen', 10, true);
//amazonCrawler('Tights', 'FashionWomen', 10, true);

//for (var i = 0; i < options.length; i++) {
// console.log('loop options: '+i);
//  amazonCrawler(options[i].k, options[i].s, options[i].l, options[i].s);
//}


/*
console.log('require cron job');
var testJob = require('./tasks/index');
console.log('start cron job');
testJob.start();
console.log('started cron job');
*/

/*
var fabric = require('fabric');
var canvas = new fabric.Canvas('c');

fabric.Image.fromURL('./sample_image/1.jpg', function(img) {
  var filter = new fabric.Image.filters.RemoveWhite({ threshold: 40, distance: 150 });
  img.filters.push(filter);
  img.applyFilters(canvas.renderAll.bind(canvas));

  //img.filters.push(new fabric.Image.filters.Sepia());
  //img.applyFilters(canvas.renderAll.bind(canvas));
  //canvas.add(img);

  //img.scale(0.5).setFlipX(true);
  //canvas.add(img);
});
*/

app.listen(port);
