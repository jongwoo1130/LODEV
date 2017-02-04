var expect  = require("chai").expect;
var request = require("request");

describe("Backend REST Call API", function() {

  describe("Response from server", function() {

    var url = "http://localhost:3000/";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

});