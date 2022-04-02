/* eslint-env node, mocha */
/*this file test all user's api*/
const chai = require('chai');
const chaiHttp = require("chai-http");
let app=require("../server");
const mongoose= require('mongoose');
const { expect } = chai;
chai.use(chaiHttp);
var id="";
describe("REST /api/users/",() => {
	it('Add User Successfully', function(done) {
		chai
		.request(app)
        .post('/users/register')
		.send({"username":"jack","role":"user","email":"abc@example.com","password":"jack"})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.be.eql("new user is created");
			done();
        });

  });
	it('username is already exist', function(done) {
		chai
		.request(app)
        .post('/users/register')
		.send({"username":"Alexander","role":"user","email":"abc@example.com","password":"jack"})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("username is already exist");
			done();
        });

  });
	it('Email is already exist', function(done) {
		chai
		.request(app)
        .post('/users/register')
		.send({"username":"abcdefg","role":"user","email":"admin@example.com","password":"jack"})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("email is already exist");
			done();
        });

	});
	it('should respond with users on json', function(done) {
		chai
		.request(app)
        .get('/users')
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type', "/json/");
            expect(res.body).to.be.an('array');
			done();
        });

  });
	it("Username is not found", done => {
		chai
		.request(app)
		.get("/users/jill")
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(400);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("username is not found");
			done();
    });

	});
	it("User data will be return", done => {
		chai
		.request(app)
		.get("/users/jack")
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect(res.body).to.be.an('array');
			expect(res.body[0].user_name).to.be.eql('jack');
			id=res.body[0]._id;
			done();
      });

	});
	it('update username who is not exist', function(done) {
		chai
		.request(app)
        .put('/users/5f79b2e7e9013a328cc7f16e')
		.send({"username":"jill","role":"user","email":"admin@example.com","password":"jack"})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("username is not found");
			done();
        });

  });
	it('update user data', function(done) {
		chai
		.request(app)
        .put('/users/'+id)
		.send({"username":"jack","password":"jill","role":"user"})
        .end(function(err, res) {
            if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("data is succesfully updated");
			done();
        });

  });
	it("User data try to delete but username is not found", done => {
		chai
		.request(app)
		.delete("/users/5f79b2e7e9013a328cc7f16e")
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("username is not found");
			done();
      });

	});
	it("User data deleted", done => {
		chai
		.request(app)
		.delete("/users/"+id)
		.end((err, res) => {
			if (err) return done(err);
			expect(res).to.have.status(200);
			expect('Content-Type',"application/json; charset=utf-8");
			expect('Content-Type',"text/html; charset=utf-8");
			expect(res.text).to.equal("username  is deleted");
			done();
      });

  });

});
after((done) => {
	app.close(() => {
		mongoose.connection.close(done);
  });
});
