app.EditRatingView = Backbone.View.extend({
  tagName: "div",
  className: "rating",
  template: _.template($("#edit-rating-template").html()),
  events: {
    'click .btn-submit-edit': 'submitEdit'
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    var html = this.template();
    this.$el.html(html);
    this.$el.find(".edit-restaurant").val(this.model.get("restaurant"));
    this.$el.find(".edit-location").val(this.model.get("location"));
    this.$el.find(".edit-rating").val(this.model.get("rating"));
  },
  submitEdit: function(e) {
    e.preventDefault();
    var restaurant = this.$el.find(".edit-restaurant").val();
    if (restaurant) {
      this.model.set("restaurant", restaurant);
    }
    else {
      alert('Please enter a restaurant name.');
      this.val(null);
      return;
    }
    var location = this.$el.find(".edit-location").val();
    if (location) {
      this.model.set("location", location);
    }
    else {
      alert('Please enter a location.');
      this.val(null);
      return;
    }
    var rating = this.$el.find(".edit-rating").val();
    if (eval(rating) < 6 && eval(rating) > 0) {
      this.model.set("rating", rating);
    }
    else {
      alert('Please enter a number between 1 and 5.');
      this.val(null);
      return;
    }
    this.model.save();
    var ratingView = new app.RatingView({
      model: this.model
    });
    this.$el.replaceWith(ratingView.$el);
    this.remove();
  }
});