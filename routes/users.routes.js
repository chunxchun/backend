var express = require('express');
var router = express.Router();
var users = require('./../handlers/user');

router.route('/users')
.get(users.getAll)
.post(users.createOne);

router.route('/users/:id')
.get(users.getOne)
.put(users.updateOne)
.delete(users.deleteOne);

router.route('/users/:userId/likes/items/:itemId')
.get(users.likeItem);

router.route('/users/:userId/likes/styles/:styleId')
.get(users.likeStyle);

router.route('/users/:userId/follows/designers/:designerId')
.get(users.followDesigner);

router.route('/users/:followerUserId/follows/users/:followeeUserId')
.get(users.followUser);


module.exports = router;
