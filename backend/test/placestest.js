/* eslint-env node, mocha */
/*this file test all place's api*/
const chai = require('chai');
const chaiHttp = require("chai-http");
let app=require("../server");
const mongoose= require('mongoose');
const { expect } = chai;
chai.use(chaiHttp);
var id="";
describe(" REST for/api/places/",() => {
	it('Add place Successfully', function(done) {
		chai
			.request(app)
			.post('/places/register')
			.send({"placename":"pratap vilas palace",
			"summary":"a good place",
			"street":"223b bakrs street",
			"city":"london",
			"state": "London",
			"country":"Britain"
			})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.be.eql("new place is created");
			done();
        });

  });
	it('places is already exist', function(done) {
		chai
		.request(app)
        .post('/places/register')
		.send({"placename":"Sunny Bungalow in the City",
			"summary":"a good place",
			"street":"223b bakrs street",
			"city":"london",
			"state": "London",
			"country":"Britain"
			})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("places is already exist");
			done();
        });

	});
	it('should respond with places on json', function(done) {
		chai
		.request(app)
        .get('/places')
        .end(function(err, res) {
        if (err) return done(err);
		expect(res).to.have.status(200);
		expect('Content-Type', "/json/");
		expect(res.body).to.be.an('array');
		done();
    });

  });
	it("places is not found", done => {
		chai
		.request(app)
		.get("/places/sunshine palace")
		.end((err, res) => {
		if (err) return done(err);
		expect(res).to.have.status(400);
		expect('Content-Type',"text/html; charset=utf-8");
		expect(res.text).to.equal("place is not found");
		done();
    });

	});
	it("place data will be return", done => {
		chai
		.request(app)
		.get("/places/pratap vilas palace")
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect(res.body).to.be.an('array');
			expect(res.body[0].place_name).to.be.eql('pratap vilas palace');
			id=res.body[0]._id
			done();
    });

	});
	it('update places who is not exist', function(done) {
		chai
		.request(app)
		.put('/places/5f79b2e7e9013a328cc7f16e')
		.send({
				"summary":"a good place to to see sunset ans sunrise",
				"street":"223b bakrs street",
				"city":"london",
				"state": "London",
				"country":"Britain"
				})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("place is not found");
			done();
        });

  });
	it('update place data', function(done) {
		chai
		.request(app)
        .put('/places/'+id)
		.send({
			"summary":"a good place",
			"street":"sadguru colony",
			"city":"jamnagar",
			"state": "gujarat",
			"country":"India"
			})
		.end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("data is succesfully updated");
			done();
        });

    });
	it("place data try to delete but place is not found", done => {
		chai
		.request(app)
		.delete('/places/5f79b2e7e9013a328cc7f16e')
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("place is not found");
			done();
    });

	});
	it("place data deleted", done => {
		chai
		.request(app)
		.delete('/places/'+id)
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("place is  deleted");
			done();
    });
  });

});
after((done) => {
  app.close(() => {
    mongoose.connection.close(done);
  });
});
