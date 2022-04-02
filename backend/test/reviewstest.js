/* eslint-env node, mocha */
/*this file test all review's api*/
const chai = require('chai');
const chaiHttp = require("chai-http");
let app=require("../server");
const mongoose= require('mongoose');
const { expect } = chai;
var userid="";
var placeid="";
chai.use(chaiHttp);
describe("Post /api/reviews/",() => {
	it('Add reviews but reviewer name is not exists', function(done) {
		chai
			.request(app)
			.post('/reviews/add')
			.send({"comment": "good places and cofee","placename": "Private Bedroom + Great Coffee","reviewername": "abcdefg"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.be.eql("reviewername is not found");
				done();
			});

    });
	it('Add reviews but places is not exists', function(done) {
		chai
			.request(app)
			.post('/reviews/add')
			.send({"comment": "good places and cofee","placename": "Private Bedroom","reviewername": "Charlotte"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("place is not found");
				done();
			});

    });
	it('Add review succesfully', function(done) {
		chai
			.request(app)
			.post('/reviews/add')
			.send({"comment": "good places and cofee","placename": "Private Bedroom + Great Coffee", "reviewername": "Charlotte"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("new review is added");
				done();
			});

	});
	it('should respond with reviews on json', function(done) {
		chai
			.request(app)
			.get('/reviews')
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type', "/json/");
				expect(res.body).to.be.an('array');
				done();
			});

    });
	it("place is not found", done => {
		chai
			.request(app)
			.get("/reviews/Private Bedroom")
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("place is not found");
				done();
			});

	});
	it("reviews will be return", done => {
		chai
			.request(app)
			.get("/reviews/Private Bedroom + Great Coffee")
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type',"application/json; charset=utf-8");
				expect(res.body).to.be.an('array');
				userid=res.body[(res.body.length-1)].reviewer_id._id;
				placeid=res.body[(res.body.length-1)].review_place_id._id;
				done();
			});
	});
	it('update review but reviewername is not found', function(done) {
		chai
			.request(app)
			.put('/reviews/'+placeid+'/'+placeid)
			.send({"comment": "good places and cofee"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("reviewername is not found");
				done();
			});

      });
	it('update review but placename is not found', function(done) {
		chai
			.request(app)
			.put('/reviews/'+userid+'/'+userid)
			.send({"comment": "good places and cofee"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("place is not found");
				done();
			});

      });
	it('update review data', function(done) {
		chai
			.request(app)
			.put('/reviews/'+userid+'/'+placeid)
			.send({"comment": "good places to visit onces"})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res).to.have.status(200);
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("data is succesfully updated");
				done();
			});

		});

	it(" try to delete reviews but username is not found", done => {
		chai
			.request(app)
			.delete("/reviews/5f79b2e7e9013a328cc7f16e/5f78038c80b6ab2d6c40fe93")
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status(400);
				expect('Content-Type',"application/json; charset=utf-8");
				expect('Content-Type',"text/html; charset=utf-8");
				expect(res.text).to.equal("username is not found");
				done();
		});
	});
	it(" try to delete reviews but placename is not found", done => {
		chai
		.request(app)
		.delete('/reviews/'+userid+'/5f79b2e7e9013a328cc7f16e')
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("place is not found");
			done();
		});
	});
	it("review deleted succesfully", done => {
    chai
		.request(app)
		.delete('/reviews/'+userid+'/'+placeid)
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("review  is deleted");
			done();
		});
	});
});
after((done) => {
	app.close(() => {
		mongoose.connection.close(done);
  });
});
