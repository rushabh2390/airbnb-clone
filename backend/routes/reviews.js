const mongoose=require('mongoose')
const express = require('express');
const routes=express.Router();
const db = require("../models");
/*This code returns the list of reviews(limit up to 10)*/
routes.get('/',async function (req,res){
	try{
		const reviews=await db.reviews.find({},{"_id":0,"review_Updated_at":0,"review_Deleted_at":0}).populate({path:'reviewer_id',select:'user_name -_id'}).populate({path:'review_place_id',select:'place_name -_id'}).limit(10)
		if(!reviews)
		{
			res.send("No reviews");
		}
		else
		{
			res.json(reviews);
		}
		
		
		
	}catch(err)
	{
		res.send("Error:"+err);
	}
	
	
});

/*This code get placename and returns place's review*/
routes.get('/:placename',async function (req,res){
	try{
		const places=await db.places.find({"place_name":req.params["placename"]})
		
		if(places.length==0)
		{
			
			return res.status(400).send("place is not found");
			
		}
		else
		{
			const placeid=new mongoose.Types.ObjectId(places[0]._id);
			const reviews=await db.reviews.find({"review_place_id":placeid},{"review_Updated_at":0,"review_Deleted_at":0}).populate({path:'reviewer_id',select:'user_name'}).populate({path:'review_place_id',select:'place_name'})
			if(reviews.length==0)
			{
				return res.status(400).send("No reviews");				
			}
			else{
				res.json(reviews);
			}
			
		}
		
		
		
	}catch(err)
	{
		res.send("Error:"+err);
	}
	
	
});

/*This code add review and incerasse no of place review*/
routes.post('/add',async function (req,res){
	try{
		const users=await db.users.findOne({user_name:req.body.reviewername});
		if(!users)
		{
			return res.status(400).send("reviewername is not found");
		}
		else{
			const userid=new mongoose.Types.ObjectId(users._id);
			var places=await db.places.findOne({place_name:req.body.placename})
			
			if(!places)
			{
				return res.status(400).send("place is not found");
			}
			else
			{
				let reviewcount=places.toObject().place_number_of_reviews;
				reviewcount=parseInt(reviewcount)+1;
				var d= new Date();
				let currdate= d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
				const placeid=new mongoose.Types.ObjectId(places._id);
				let review  = new db.reviews({
				review_place_id: placeid,
				reviewer_id: userid,
				review_comments: req.body.comment,
				review_Created_at:currdate});
				await review.save();
				await db.places.findOneAndUpdate(
					{
						_id:placeid
					},
					{
						"$set":{
							"place_number_of_reviews": reviewcount,
							"place_last_review":currdate
						}
						
					},{new:true},(err,doc)=>{
						if(err)
						{
							res.status(400).send("Something went wrong");
						}
						else if(doc)
						{
							res.send("new review is added");
						}
						
						
					});
				
			}
		}
	}catch(err)
	{
		res.send("Error:"+err.message);
	}
	
	
});

/*This code update review*/
routes.put('/:reviewerid/:placeid',async function (req,res){
	try{
		const users=await db.users.find({"_id":req.params.reviewerid});
		if(users.length ==0)
		{
			return res.status(400).send("reviewername is not found");
		}
		else{
			const userid=new mongoose.Types.ObjectId(users[0]._id);
			var places=await db.places.find({"_id":req.params.placeid})
			if(places.length==0)
			{
				return res.status(400).send("place is not found");
			}
			else
			{
				const placeid=new mongoose.Types.ObjectId(places[0]._id);
				var d= new Date();
				let currdate= d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
					await db.reviews.findOneAndUpdate(
					{
						reviewer_id:userid,
						review_place_id:placeid
						
					},
					{
						review_comments: req.body.comment,
						review_Updated_at:currdate
					},{new: true});
					res.send("data is succesfully updated");
			}
		}
				
	}catch(err)
	{
		res.send("Error:"+err.message);
		
	}
	
	
});

/*This code get placename, reviewername and that review also decrease no of review for the pplace */
routes.delete('/:reviewerid/:placeid',async function (req,res){
	try{
		const users=await db.users.findOne({"_id":req.params.reviewerid});
		if(!users)
		{
			return res.status(400).send("username is not found");
		}
		else{
			
			var places=await db.places.findOne({"_id":req.params.placeid})
			if(!places)
			{
				return res.status(400).send("place is not found");
			}
			else
			{
				const userid=new mongoose.Types.ObjectId(users._id);
				const placeid=new mongoose.Types.ObjectId(places._id);
				let reviewcount=places.toObject().place_number_of_reviews;
				reviewcount=parseInt(reviewcount)-1;
				const review=await db.reviews.findOne({"review_place_id":placeid,"reviewer_id":userid})
				if(!review)
				{
					return res.status(400).send("No review Found");
				}
				else
				{
					
					await db.reviews.remove({"review_place_id":placeid,"reviewer_id":userid})
					if(reviewcount!=0)
					{
						const last_review_date=await db.reviews.findOne({"review_place_id":placeid}).sort({"review_Created_at":-1}).limit(1)
						let date = last_review_date.review_Created_at.split("-");
						let lastdate=date[2]+"-"+date[1]+"-"+date[0];
						await db.places.findOneAndUpdate(
						{
							_id:placeid
						},
						{
							"$set":{
								"place_number_of_reviews": reviewcount,
								"place_last_review":lastdate
							}
							
						},{new:true},(err,doc)=>{
							if(err)
							{
								res.status(400).send("Something went wrong");
							}
							else if(doc)
							{
								res.send("review  is deleted");
							}
							
							
						});
					}
					else
					{
						await db.places.findOneAndUpdate(
						{
							_id:placeid
						},
						{
							"$set":{
								"place_number_of_reviews": reviewcount,
								"place_first_review":null,
								"place_last_review":null
							}
							
						},{new:true},(err,doc)=>{
							if(err)
							{
								res.status(400).send("Something went wrong");
							}
							else if(doc)
							{
								res.send("review  is deleted");
							}
							
							
						});
					}
					
					
					
					
				}
				
			}
			
		}
			
		
		
		
		
	}catch(err)
	{
		res.send("Error:"+err.message);
	}
	
	
});

module.exports=routes;
