// load dependencies
var express = require('express');
var router = express.Router();
var Rating = require('../model');


// middleware to use for all requests
router.use(function(req, res, next) {
  // this can be used for validations, errors, logging, etc
  console.log("Received a request!");
  next(); //send user to the next route
});

// test route
router.get('/', function(req, res) {
  res.json({
    message: 'hello from the api'
  });
});

// router.route() handles multiple routes for the same URI
// /ratings handles all the HTTP requests that end in /ratings
router.route('/ratings')
  // create a rating (POST api/ratings)
  .post(function(req, res) {

    var rating = new Rating({
      restaurant: req.body.restaurant,
      location: req.body.location,
      rating: req.body.rating
    });

    rating.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Rating created"
      });
    });
  })
  // get all the ratings (GET api/ratings)
  .get(function(req, res) {
    return Rating.find(function(err, ratings) {
      if (err) {
        res.send(err);
      }
      res.json(ratings);
    });
  });

// get, update, or delete a specific rating
router.route('/ratings/:rating_id')
  .get(function(req, res) {
    Rating.findById(req.params.rating_id, function(err, rating) {
      if (err) {
        res.send(err);
      }
      res.json(rating);
    });
  })
  .put(function(req, res) {
    Rating.findById(req.params.rating_id, function(err, rating) {
      if (err) {
        res.send(err);
      }

      for (var key in req.body) {
        rating[key] = req.body[key];
      }

      rating.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Rating updated"
        });
      });
    });
  })
  .delete(function(req, res) {
    Rating.remove({
      "_id": req.params.rating_id
    }, function(err, rating) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Rating deleted"
      });
    });
  });

module.exports = router;