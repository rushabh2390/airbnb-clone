var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"
var dbName="airbnbdb";

var getid=(async ( collection,parameters) =>
{
    let fields={}
    fields=parameters.map((data,item) => {
        data[item] = 1;

        return data
    }, {})
    let db= await MongoClient.connect(url+"/" + dbName);
    let docs = await db.collection(collection).find({},fields).toArray();
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

var insertreviewdata=(async (reviews) =>
{
    let db= await MongoClient.connect(url+"/" + dbName);
    await db.collection("reviews").insertMany(reviews);
	await db.close();
});
module.exports = { insertuserdata,insertplacedata,insertreviewdata,getid };
