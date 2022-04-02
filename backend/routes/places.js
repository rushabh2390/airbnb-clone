const express = require('express');
const routes=express.Router();
const db = require("../models");
const mongoose=require('mongoose')
/*This code returns list of placess(right now limit of 10)*/
routes.get('/',async function (req,res){
	try{
		const places=await db.places.find({},{"place_name":1,"place_street":1,"place_summary":1,"place_city":1,"place_state":1,"place_country":1,"place_thumbnail_url":1});
		if(!places)
		{
				return res.status(400).res.send("No places");
		}
		else
		{
			res.json(places);
		}



	}catch(err)
	{
		res.send("Error:"+err);
	}


});
/* this code take place name in get and returns place details*/
routes.get('/:placename',async function (req,res){
	try{
		const places=await db.places.find({"place_name":{$regex: '.*' + req.params.placename + '.*'}},{"place_name":1,"place_street":1,"place_summary":1,"place_city":1,"place_state":1,"place_country":1,"place_thumbnail_url":1})
		if(places.length==0)
		{

			return res.status(400).send("place is not found");

		}
		else
		{
			res.json(places);
		}



	}catch(err)
	{
		res.send("Error:"+err);
	}


});

/* This code register place details whihc have unique place name */
routes.post('/register',async function (req,res){
	try{
		const places=await db.places.findOne({place_name:req.body.placename}).count();
		if(places!=0)
		{
			return res.status(400).send("places is already exist");
		}
		else{

			let place = new db.places({
            place_name: req.body.placename,
            place_summary: req.body.summary,
		      	place_street:req.body.summary,
			      place_city:req.body.city,
			      place_state:req.body.state,
			      place_country:req.body.country,
			      place_Created_at:Date.now()
			});
			await place.save();
			res.send("new place is created");
		}



	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});

/* This code update place details*/
routes.put('/:placeid',async function (req,res){
	try{
			if(req.params.placeid)
			{
				var id=new mongoose.Types.ObjectId(req.params.placeid);
				const places=await db.places.findOne({"_id":id}).count();
				if(places==0)
				{
					return res.status(400).send("place is not found");
				}
				else{
					await db.places.findOneAndUpdate(
					{"_id":id},
					{
					place_name: req.body.placename,
					place_summary: req.body.summary,
					place_street:req.body.street,
					place_city:req.body.city,
					place_state:req.body.state,
					place_country:req.body.country,
					place_Updated_at:Date.now()
					},{new: true},(err,doc)=>{
						if(err)
						{
							res.status(400).send("Something went wrong");
						}
						else if(doc)
						{
							res.send("data is succesfully updated");
						}


					});

				}
			}
			else
			{
				return res.status(400).send("no place");
			}
	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});

/* This code get placename and delete its details*/
routes.delete('/:placeid',async function (req,res){
	try{
		var id=new mongoose.Types.ObjectId(req.params.placeid);
		if(req.params.placeid)
		{
			const places=await db.places.findOne({_id:id}).count();
			if(places==0)
			{
				return res.status(400).send("place is not found");
			}
			else
			{
				await db.places.remove({_id:id});
				res.send("place is  deleted");
			}

		}
		else
		{
			return res.status(400).send("no place");
		}
	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});
module.exports=routes;
