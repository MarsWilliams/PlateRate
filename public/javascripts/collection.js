if (typeof plateRate === "undefined") plateRate = {};

plateRate.Ratings = Backbone.Collection.extend({
  model: plateRate.Rating,
  url: '/api/ratings'
});