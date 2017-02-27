var router = require('express').Router();
var User = require('../models/user.model');

router.route('/')
//.all()
.get(getAll)
.post(createOne);

router.route('/id/:userId')
//.all()
.get(getOne)
.put(updateOne)
.delete(deleteOne);

router.route('/id/:userId/like/item/:itemId')
//.all()
.get(likeItem);

router.route('/id/:userId/like/style/:styleId')
//.all()
.get(likeStyle);

router.route('/id/:userId/follow/designer/:designerId')
//.all()
.get(followDesigner);

router.route('/id/:followerUserId/follow/user/:followeeUserId')
//.all()
.get(followUser);

module.exports = router;

function getAll(req, res, next) {
  var query = {};
  var options = {
    sort: { lastEditDate: -1 },
    //select: 'email',
    lean: true,
    offset: parseInt(req.query.offset),
    limit: parseInt(req.query.limit)
  };

  User.paginate(query, options)
  .then( users => res.status(200).json(users) )
  .catch( err => res.status(500).json(err) );
}

function createOne(req, res, next) {
  console.log(req.body);
  User.create(req.body, function(err, user) {
    if(err) {
      console.log(err);
      res.status(400).json(err);
    }
    res.status(201).json(user);
  });
}

function getOne(req, res, next) {
  User.findById(req.params.userId).exec((err, user) => {
    if(err) {
      console.log(err);
      res.status(400).json(err);
    }
    res.status(200).json(user);
  });
}

function updateOne(req, res, next) {
  User.findOneAndUpdate({ id: req.params.id }, req.body, function(err, user) {
    if (err) return res.status(400).json(err);
    if (!user) return res.status(404).json();
    res.status(200).json(user);
  });
}

function deleteOne(req, res, next) {
  User.findOneAndRemove({ id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.status(400).json(err);
    }
    console.log('successfully remove user: '+ req.params.id);
    res.status(204).json();
  });
}

function likeItem(req, res, next) {
  User.findOne({ id: req.params.userId }, function(err, user) {
    if (err) return res.status(400).json(err);
    if (!user) return res.status(404).json();

    Item.findOne({ id: req.params.itemId }, function(err, item) {
      if (err) return res.status(400).json(err);
      if (!item) return res.status(404).json();

      // if already liked item
      var likedItemsIndex = user.likedItems.indexOf(req.params.itemId);
      var likedByUsersIndex = item.likedByUsers.indexOf(req.params.userId);

      if (likedItemsIndex) {
        // remove from likeItems array
        user.likedItems.splice(likedItemsIndex);

        // remove from likedByUsers array
        item.likedByUsers.splice(likedByUsersIndex);
        res.status(200).json(user);
        return;
      }

      // push to user likeItems array
      user.likedItems.push(req.params.itemId);
      // push to item likedByUsers array
      item.likedByUsers.push(req.params.userId);

      user.save(function(err) {
        if (err) return res.status(500).json(err);
        res.status(201).json(user);
      });

    });

  });
}

function likeStyle(req, res, next) {
  User.findOne({ id: req.params.userId }, function(err, user) {
    if (err) return res.status(400).json(err);
    if (!user) return res.status(404).json();

    Style.findOne({ id: req.params.styleId }, function(err, style) {
      if (err) return res.status(400).json(err);
      if (!style) return res.status(404).json();

      // if already liked style
      var likedStylesIndex = user.likedStyles.indexOf(req.params.styleId);
      var likedByUsersIndex = style.likedByUsers.indexOf(req.params.userId);

      if (likedStylesIndex) {
        // remove from likeItems array
        user.likedStyles.splice(likedStylesIndex);

        // remove from likedByUsers array
        item.likedByUsers.splice(likedByUsersIdex);
        res.status(200).json(user);
        return;
      }

      // push to user likeItems array
      user.likedStyles.push(req.params.styleId);
      // push to item likedByUsers array
      item.likedByUsers.push(req.params.userId);

      user.save(function(err) {
        if (err) return res.status(500).json(err);
        res.status(201).json(user);
      });

    });

  });
}

function followDesigner(req, res, next) {
  User.findOne({ id: req.params.userId }, function(err, user) {
    if (err) return res.status(400).json(err);
    if (!user) return res.status(404).json();

    Designer.findOne({ id: req.params.designerId }, function(err, designer) {
      if (err) return res.status(400).json(err);
      if (!designer) return res.status(404).json();

      // if already liked style
      var followingDesignersIndex = user.followingDesigners.indexOf(req.params.designerId);
      var followedByUsersIndex = designer.followedByUsers.indexOf(req.params.userId);

      if (followingDesignersIndex) {
        // remove from followingDesigners array
        user.followingDesigners.splice(followingDesignersIndex);

        // remove from followedByUsers array
        designer.followedByUsers.splice(followedByUsersIndex);
        res.status(200).json(user);
        return;
      }

      // push to user followingDesigners array
      user.followingDesigners.push(req.params.designerId);
      // push to designer followedByUsers array
      designer.followedByUsers.push(req.params.userId);

      user.save(function(err) {
        if (err) return res.status(500).json(err);
        res.status(201).json(user);
      });

    });

  });
}

function followUser(req, res, next) {
  User.findOne({ id: req.params.followerUserId }, function(err, follower) {
    if (err) return res.status(400).json(err);
    if (!follower) return res.status(404).json();

    User.findOne({ id: req.params.followeeUserId }, function(err, followee) {
      if (err) return res.status(400).json(err);
      if (!followee) return res.status(404).json();

      // if already following user
      var followingUsersIndex = follower.followingUsers.indexOf(req.params.followerUserId);
      var followedByUsersIndex = followee.followedByUsers.indexOf(req.params.followeeUserId);

      if (followingUsersIndex) {
        // remove from followingUsers array
        follower.followingUsers.splice(followingUsersIndex);

        // remove from followedByUsers array
        followee.followedByUsers.splice(followedByUsersIndex);

        res.status(200).json(follower);
        return;
      }

      follower.followingUsers.push(req.params.followeeUserId);
      followee.followedByUsers.push(req.params.followerUserId);

      follower.save(function(err) {
        if (err) return res.status(500).json(err);
        res.status(201).json(follower);
      });

    });

  });
}
