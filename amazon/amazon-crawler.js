var amazonClient = require('./amazon-client');
var AmazonItem = require('./item.model');

module.exports = function(keywords, searchIndex, loop, saveToDB) {
  if(typeof keywords !== 'string' || typeof searchIndex !== 'string') return;
  if(typeof loop !== 'number' || (loop%1) !== 0 || loop < 1) return;
  if(typeof saveToDB !== 'boolean') return;

  
  for (var i = 1; i <= loop; i++) {
    console.log('looping amazon client, now loop '+i);
    amazonClient.itemSearch({
      searchIndex: searchIndex,
      //brand: 'Nike',
      keywords: keywords,
      responseGroup: 'ItemAttributes, Images',
      itemPage: i,
    })
    .then( result => {
      //console.log(JSON.stringify(result));
      //console.log('end of raw result');
      for (var j = 0; j < result.length; j++) {
        //console.log('now in loop: '+i+' item: '+j);
        //console.log('result loop: '+j+', and ASIN: '+result[j].ASIN[0]);
        //console.log('result loop: '+j+', and imageUrl: '+result[j].LargeImage[0].URL[0]);
        //console.log('result loop: '+j+', and Url: '+result[j].DetailPageURL[0]);
        //console.log('result loop: '+j+', and Title: '+result[j].ItemAttributes[0].Title[0]);
        
        // construct item
        var cur = result[j];
        var item = {};
        item.asin = isString(cur.ASIN[0]) ? cur.ASIN[0] : '';
        item.url = isString(cur.DetailPageURL[0]) ? cur.DetailPageURL[0] : '';
        item.small_image = isString(cur.SmallImage[0].URL[0]) ? cur.SmallImage[0].URL[0] : '';
        item.medium_image = isString(cur.MediumImage[0].URL[0]) ? cur.MediumImage[0].URL[0] : '';
        item.large_image = isString(cur.LargeImage[0].URL[0]) ? cur.LargeImage[0].URL[0] : '';
        item.brand = isString(cur.ItemAttributes[0].Brand[0]) ? cur.ItemAttributes[0].Brand[0] : '';
        item.size = isString(cur.ItemAttributes[0].ClothingSize[0] ) ? cur.ItemAttributes[0].ClothingSize[0] : '';
        item.title = isString(cur.ItemAttributes[0].Title[0]) ? cur.ItemAttributes[0].Title[0] : '';
        
        item.binding = isArray(cur.ItemAttributes[0].Binding) ? cur.ItemAttributes[0].Binding : [];
        item.description = isArray(cur.ItemAttributes[0].Feature) ? cur.ItemAttributes[0].Feature : [];
        
        //console.log(item);
          //image: {
            //small: result[j].SmallImage[0].URL[0] || '',
            //medium: result[j].MediumImage[0].URL[0] || '',
            //large: result[j].LargeImage[0].URL[0] || '',
          //},
          //binding: result[j].ItemAttributes[0].Binding || '',
          //brand: result[j].ItemAttributes[0].Brand[0] || '',
          //size: result[j].ItemAttributes[0].Clothing[0] || '',
          //title: result[j].ItemAttributes[0].Title[0] || '',
          //desciption: result[j].ItemAttributes[0].Feature[0]  || ''// use first item in the Feature array
        
        // store item to database
        if(saveToDB) {
          // if ASIN not exist, add to collection
          AmazonItem.create(item, (err, item) => {
            if(err) console.log(err);
            console.log('save amazon item (ASIN:'+item.asin+') success.');
          })
        }  
      }
    })
    .catch( err => console.log(err) );
  }
};

function isString(s) {
  if (typeof s === 'undefined') return false;
  return typeof s === 'string';
}

function isArray(a) {
  if (typeof a === 'undefined') return false;
  return a instanceof Array;
}