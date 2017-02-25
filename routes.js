var app = require('./express');
var items = require('./items');
var styles = require('./styles');
var designers = require('./designers');
var users = require('./users');

app.route('/items')
.get(items.getAll)
.post(items.createOne);

app.route('/items/:id')
.get(items.getOne);
.put(items.updateOne);
.delete(items.deleteOne);

app.route('/styles')
.get(styles.getAll)
.post(styles.createOne);

app.route('/styles/:id')
.get(styles.getOne);
.put(styles.updateOne);
.delete(styles.deleteOne);

app.route('/designers')
.get(designers.getAll)
.post(designers.createOne);

app.route('/designers/:id')
.get(designers.getOne);
.put(designers.updateOne);
.delete(designers.deleteOne);

app.route('/users')
.get(users.getAll)
.post(users.createOne);

app.route('/users/:id')
.get(users.getOne);
.put(users.updateOne);
.delete(users.deleteOne);

app.route('/users/:userId/likes/items/:itemId')
.get(users.likeItem);

app.route('/users/:userId/likes/styles/:styleId')
.get(users.likeStyle);

app.route('/users/:userId/follows/designers/:designerId')
.get(users.followDesigner);

app.route('/users/:followerUserId/follows/users/:followeeUserId')
.get(users.followUser);
