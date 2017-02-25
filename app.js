var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./db')(app);

/*
var items = require('./handlers/item');
var styles = require('./handlers/style');
var designers = require('./handlers/designer');
var users = require('./handlers/user');
*/

var items = rquire('./items.routes');
var styles = rquire('./styles.routes');
var designers = rquire('./designers.routes');
var users = rquire('./users.routes');

app.use('/items', items);
app.use('/styles', styles);
app.use('/designers', designers);
app.use('/users', users);



/*
app.route('/items')
.get(items.getAll)
.post(items.createOne);

app.route('/items/:id')
.get(items.getOne)
.put(items.updateOne)
.delete(items.deleteOne);

app.route('/styles')
.get(styles.getAll)
.post(styles.createOne);

app.route('/styles/:id')
.get(styles.getOne)
.put(styles.updateOne)
.delete(styles.deleteOne);

app.route('/designers')
.get(designers.getAll)
.post(designers.createOne);

app.route('/designers/:id')
.get(designers.getOne)
.put(designers.updateOne)
.delete(designers.deleteOne);

app.route('/users')
.get(users.getAll)
.post(users.createOne);

app.route('/users/:id')
.get(users.getOne)
.put(users.updateOne)
.delete(users.deleteOne);

app.route('/users/:userId/likes/items/:itemId')
.get(users.likeItem);

app.route('/users/:userId/likes/styles/:styleId')
.get(users.likeStyle);

app.route('/users/:userId/follows/designers/:designerId')
.get(users.followDesigner);

app.route('/users/:followerUserId/follows/users/:followeeUserId')
.get(users.followUser);
*/

app.listen(3000);
