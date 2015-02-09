if (typeof plateRate === "undefined") plateRate = {};

// defines model and sets defualts; validates data for posts
plateRate.Rating = Backbone.Model.extend({
  defaults: {
    restaurant: 'Momiji',
    location: 'Seattle, Washington',
    rating: 5,
    updated_at: Date()
  },
  validation: {
    restaurant: {
      required: true,
    },
    location: {
      required: true,
    },
    rating: {
      required: true,
      range: [1, 6],
    }
  },
  initialize: function() {
    console.log("New rating model initialized.");
  },
  parse: function(resp) {
    resp.id = resp._id;
    return resp;
  }
});