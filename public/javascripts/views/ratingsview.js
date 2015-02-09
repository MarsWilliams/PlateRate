if (typeof plateRate === "undefined") plateRate = {};

plateRate.RatingsView = Backbone.View.extend({
  el: $("#wrapper"),
  formTemplate: _.template($('#add-rating-template').html()),
  events: {
    'click #btn-add': 'addRating',
  },
  // fetches all ratings from the database
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
    // adds rating form to the dom
    var addRatingForm = this.formTemplate();
    $("#add-new-rating").html(addRatingForm);
  },
  // adds each rating to the dom
  renderRating: function(rating) {
    var ratingView = new plateRate.RatingView({
      model: rating
    });
    $("#ratings").append(ratingView.render().el);
  },

  addRating: function(e) {
    e.preventDefault();
    var rating = {};
    // serializes form data to a javascript object
    var formData = $("#add-rating-form").serializeArray();
    formData.map(function(field) {
      rating[field.name] = field.value;
    });
    // creates new instance of rating model
    this.collection.create(rating);
    $("#add-rating-form input").val('');
  }
});