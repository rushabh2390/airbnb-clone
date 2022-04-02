/* this code is useed t create mongo db airbnbdb and add roles,place,reviews,booking, and ratings collection in ti*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"
var dbName="airbnbdb";
(async () =>{
	let db = await MongoClient.connect(url+"/" + dbName);
	await db.createCollection("places");
	await db.createCollection("ratings");
	await db.createCollection("roles");
	await db.createCollection("bookings");
	await db.createCollection("users");
	await db.collection("roles").insertMany([
	{role_name:"admin",role_Created_at:Date.now(),role_Updated_at:"",role_Deleted_at:""},
	{role_name:"user",role_Created_at:Date.now(),role_Updated_at:"",role_Deleted_at:""}
	]);
	await db.close();	
	console.log("users,role,places,ratings and bookings tables are  created");
	console.log("role data is inserted");	
})()
