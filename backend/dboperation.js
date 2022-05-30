require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URL;// || "mongodb://mongodb:27017"
var dbName="airbnbdb";
var getroleid=(async () =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    let docs = await db.collection("roles").find().toArray();
    db.close();

    return docs;
});

var insertuserdata=(async (users) =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    await db.collection("users").insertMany(users);
	await db.close();
});

var insertplacedata=(async (places) =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    await db.collection("places").insertMany(places);
	await db.close();
});

var getuserid=(async () =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    let docs = await db.collection("users").find({},{id:1,_id:1}).toArray();
    db.close();

    return docs;
});
var getplaceid=(async () =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    let docs = await db.collection("places").find({},{place_id:1,_id:1}).toArray();
    db.close();

    return docs;
});
var insertreviewdata=(async (reviews) =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    await db.collection("reviews").insertMany(reviews);
	await db.close();
});

module.exports = { getroleid,insertuserdata,insertplacedata,getuserid,getplaceid,insertreviewdata };
