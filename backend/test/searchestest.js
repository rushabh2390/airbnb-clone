/* eslint-env node, mocha */
/*this file test all search's api*/
const chai = require('chai');
const chaiHttp = require("chai-http");
let app=require("../server");
const mongoose= require('mongoose');
const { expect } = chai;
chai.use(chaiHttp);
describe("Post /api/searches/",() => {
	it('search place that is not exist', function(done) {
		chai
			.request(app)
			.post('/searches/')
			.send({ "place": "abcdefg","check-in": "2020-10-05","check-out": "2020-10-07","guests": "3"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.be.eql("No result found");
				done();
			});

  });
	it('search place near me but no near place', function(done) {
		chai
			.request(app)
			.post('/searches/')
			.send({ "place": "Near me","check-in": "2020-10-05","check-out": "2020-10-07","guests": "3"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.be.eql("No result found");
				done();
			});

  });
	it('place given with guest', function(done) {
		chai
			.request(app)
			.post('/searches/')
			.send({"place": "Boston","check-in": "2020-10-05","check-out": "2020-10-07","guests": "3"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type', "/json/");
				expect(res.body).to.be.an('array');
				done();
			});

  });
	it('place given without guest', function(done) {
		chai
			.request(app)
			.post('/searches/')
			.send({"place": "Boston","check-in": "2020-10-05","check-out": "2020-10-07"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type', "/json/");
				expect(res.body).to.be.an('array');
				done();
			});

  });
	it('place  near me and longitude and latitude is given without guest', function(done) {
		chai
			.request(app)
			.post('/searches/')
			.send({"place": "Near me","check-in": "2020-10-05","check-out": "2020-10-07"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type', "/json/");
				expect(res.body).to.be.an('array');
				done();
      });

  });

});
after((done) => {
	app.close(() => {
		mongoose.connection.close(done);
  });
});
