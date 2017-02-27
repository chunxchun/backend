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

app.use('/api/items', itemRouter);
app.use('/api/styles', styleRouter);
app.use('/api/designers', designerRouter);
app.use('/api/users', userRouter);


app.listen(port);
