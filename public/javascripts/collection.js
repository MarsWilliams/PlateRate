if (typeof plateRate === "undefined") plateRate = {};

// sets up rest api routes
plateRate.Ratings = Backbone.Collection.extend({
  model: plateRate.Rating,
  url: '/api/ratings'
});