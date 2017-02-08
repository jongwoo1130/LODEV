var expect  = require("chai").expect;
var request = require("request");
var should = require('should');
var req= require('supertest');  

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
describe("Backend REST Call API", function() {
    var url = "https://localhost:3000/";
    describe("GET Response from server", function() {
        it("Should return STATUS CODE 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
    });

  describe("POST to invalid URL", function(){
    var url = "https://localhost:3000/";
    var data ={username: "10", data: "10", location: "Toronto"};
    it("Should return STATUS CODE 404", function(done) {
    req(url)
    .post('/itemList')
    .send(data)
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe("POST duplicate value to correct URL", function(){
    var url = "https://localhost:3000/";
    var data ={username: "10", data: "10", location: "Toronto"};
    it("Should return STATUS CODE 403", function(done) {
    req(url)
    .post('itemList')
    .send(data)
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });

  describe("POST valid value to correct URL", function(){
    var url = "https://localhost:3000/";
    var data ={username: "10", data: "14", location: "Toronto"};
    it("Should return STATUS CODE 200", function(done) {
    req(url)
    .post('itemList')
    .send(data)
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});