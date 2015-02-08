app.Ratings = Backbone.Collection.extend({
  model: app.Rating,
  url: '/api/ratings'
});