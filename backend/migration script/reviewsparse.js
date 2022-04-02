var dbcon= require('./dboperation');
var csvtojson = require('csvtojson');
var users_id_value=[]
var places_id_value=[]

/* This code parse reviews,js and get and add rviews into reviews collection
	here it will add user id and place id taken from user and places collection respectively*/
try{
	(async ()=>{
		var users=await dbcon.getid("users",["id"])
		users_id_value=users.reduce((role_data, item) => {
			role_data[item.id] = item._id;
			
			return role_data;
			
		}, {})
		var places= await dbcon.getid("places",["place_id"])
		places_id_value=places.reduce((role_data, item) => {
			role_data[item.place_id] = item._id;
			
			return role_data;
		}, {})
		var reviewdata=await csvtojson().fromFile("reviews.csv")
		let reviewjson = Object.values(reviewdata.reduce((reviews, item) => {
			var userid=users_id_value[item.reviewer_id];
			var placeid=places_id_value[item.listing_id];
			reviews[item.id]=
			{
					id:item.id
					,review_place_id:placeid
					,reviewer_id:userid
					,review_comments:item.comments
					,review_Created_at:item.date
					,review_Updated_at:""
					,review_Deleted_at:""

			}

			return reviews;
		}, {}));
		await dbcon.insertreviewdata(reviewjson);
		console.log("reviews data are inserted")

	})();
}

catch(error){
	console.log(error);
	
}
