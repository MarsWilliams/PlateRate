if (typeof plateRate === "undefined") plateRate = {};

plateRate.RatingsView = Backbone.View.extend({
  el: $("#wrplateRateer"),
  formTemplate: _.template($('#add-rating-template').html()),
  events: {
    'click #btn-add': 'addRating',
  },
  initialize: function() {
    this.collection = new plateRate.Ratings();
    this.collection.fetch({
      reset: true
    });
    // render a new rating view when new rating is added to collection
    this.listenTo(this.collection, 'add', this.renderRating);
    // re-render whole collection view on collection fetch/reset
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    this.collection.each(function(rating) {
      this.renderRating(rating);
    }, this);
    var addRatingForm = this.formTemplate();
    $("#add-new-rating").html(addRatingForm);
  },
  renderRating: function(rating) {
    var ratingView = new plateRate.RatingView({
      model: rating
    });
    $("#ratings").append(ratingView.render().el);
  },
  addRating: function(e) {
    e.preventDefault();
    var rating = {};
    var formData = $("#add-rating-form").serializeArray();
    formData.map(function(field) {
      rating[field.name] = field.value;
    });
    this.collection.create(rating);
    $("#add-rating-form input").val('');
  }
});