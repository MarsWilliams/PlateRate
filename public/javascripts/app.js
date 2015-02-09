if (typeof plateRate === "undefined") plateRate = {};

// creates view of ratings on document ready
$(function() {
  new plateRate.RatingsView();
});