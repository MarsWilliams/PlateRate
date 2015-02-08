var should = chai.should();

// make sure that the global name space variable exists
describe("Application", function() {
  it("creates a global variable for the name space", function () {
    should.exist(plateRate);
  });
});

// verifies creation of a rating with reasonable
describe("Rating Model", function(){
  describe("Initialization", function() {
    beforeEach(function() {
      this.rating = new plateRate.Rating();
    });
    it("should default the date to 'Date()'",function() {
      this.rating.get('updated_at').should.equal(Date());
    });
    it("should default the restaurant to a'Momiji'",function() {
      this.rating.get('restaurant').should.equal("Momiji");
    });
    it("should default the location to a'Seattle'",function() {
      this.rating.get('location').should.equal("Seattle");
    });
    it("should default the restaurant to a'Momiji'",function() {
      this.rating.get('rating').should.equal(5);
    });
  });
});

// model should do is update the database whenever any of its properties change
describe("Persistence", function() {
  beforeEach(function() {
    this.rating = new plateRate.Rating();
    this.save_stub = sinon.stub(this.rating, "save");
  });
  afterEach(function() {
    this.save_stub.restore();
  });
  it("should update server when restaurant is changed", function() {
    this.rating.set("restaurant", "Jane");
    this.save_stub.should.have.been.calledOnce;
  });
});

// ensure that the view’s render() method returns the view itself
// verifies that the HTML element the render creates is a list
describe("Rating View", function() {
  beforeEach(function(){
    this.ratingView = new plateRate.RatingsView({model: this.rating});
  });
  it("render() should return the view object", function() {
    this.ratingView.render().should.equal(this.ratingView);
  });
  it("should render as a div", function() {
    this.item.render().el.nodeName.should.equal("div");
  });
});

// verify that implementation of the collection’s view is appropriate
describe("Rating View", function() {
  beforeEach(function(){
    this.ratings = new plateRate.Ratings([
      {restaurant: "Jane", location: "San Francisco", rating: 5},
      {restaurant: "My Ivy", location: "San Francisco", rating: 3}
    ]);
    this.ratingsView = new plateRate.RatingsView({collection: this.ratings});
  });
  it("render() should return the view object", function() {
    this.list.render().should.equal(this.ratingsView );
  });
  it("should render as an unordered list", function() {
    this.list.render().el.nodeName.should.equal("div");
  });
  it("should include list items for all models in collection", function() {
    this.list.render();
    this.list.$el.find("div").should.have.length(2);
  });
});

// verify that our collection correctly initializes itself using the REST API
describe("Collection's Interaction with REST API", function() {
  it("should load using the API", function() {
    this.ajax_stub = sinon.stub($, "ajax").yieldsTo("success", [
      {restaurant: "Jane", location: "San Francisco", rating: 5},
      {restaurant: "My Ivy", location: "San Francisco", rating: 3}
    ]);
    this.ratings = new plateRate.Ratings();
    this.ratings.fetch();
    this.ratings.should.have.length(2);
    this.ratings.at(0).get('restaurant').should.equal("Jane");
    this.ratings.at(1).get('restaurant').should.equal("My Ivy");
    this.ajax_stub.restore();
  });
});