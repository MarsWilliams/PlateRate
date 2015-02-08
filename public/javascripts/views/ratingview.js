if (typeof plateRate === "undefined") plateRate = {};

plateRate.RatingView = Backbone.View.extend({
  tagName: 'div',
  className: 'rating',
  template: _.template($('#rating-template').html()),
  events: {
    'click .btn-delete': 'deleteRating',
    'click .btn-edit': 'editRating'
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  deleteRating: function(e) {
    this.model.destroy();
    this.remove();
  },
  editRating: function() {
    var editView = new plateRate.EditRatingView({
      model: this.model
    });
    this.$el.replaceWith(editView.el);
    this.remove();
  }
});
