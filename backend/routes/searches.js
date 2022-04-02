const express = require('express');
var geoip = require('geoip-lite');
const routes=express.Router();
const db = require("../models");
/* this code take the serach place(city) chek-in, check-out, no-of-guest   and return place's list.
	if you give place near to me then it will take latitude and longitude of you ipaddres and returns places list.
 */
routes.post('/',async function (req,res){
	try{
		if(req.body.place!="Near me" && req.body.place!=null)
		{
			if(req.body.checkin)
			{
				/*as we have  right now no document in booking collection is empty so here no code*/
			}
			if(req.body.checkout)
			{
				/*as we have  right now no document in booking collection is empty so here no code*/
			}
			if(req.body.guests)
			{
				let guest=parseInt(req.body.guests)
				const searches=await db.places.find({"place_city":req.body.place,"$expr": { "$gte": [{ "$toInt": "$place_guests_included" },guest ]}})
				if(searches.length==0)
				{
					return res.status(400).send("No result found");
				}
				else
				{
					res.json(searches);
				}

			}
			else
			{
				const searches=await db.places.find({"place_city":req.body.place})
				if(!searches)
				{
					return res.status(400).send("No result found");
				}
				else
				{
					res.json(searches);
				}
			}
		}
		else
		{
			/*this code is using geoip to get latitude and longitude  from the clien ip address */
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			ip="117.229.15.166"
			var geo=geoip.lookup(ip);
			let lati= parseFloat(geo.ll[0]);
			let longi= parseFloat(geo.ll[1]);
			if(req.body.guests)
			{
				let guest=parseInt(req.body.guests)
				const searches=await db.places.find({
					$and:[
						{ "$expr":{"$gte": [{ "$toInt": "$place_guests_included" },guest]}},
						{
							"$expr":
				{
					"$lte":[
					{"$sqrt":
						{
							"$add":
							[{
								"$pow":
									[
									{
										"$subtract":
										[
											{"$toDouble":"$place_latitude"},
											lati
										]},
										2
									]}
								,
								{	"$pow":
									[{
										"$subtract":
										[
											{"$toDouble":"$place_longitude"},
											longi
									]},
										2
									]
								}]


						}
					},0.1]}
						}
				]}).limit(10)
				if(searches.length==0)
				{
					return res.status(400).send("No result found");
				}
				else
				{
					res.json(searches);
				}
			}
			else
			{
			const searches=await db.places.find({"$expr":
				{"$lte":[
					{"$sqrt":
						{
							"$add":
							[{
								"$pow":
									[
									{
										"$subtract":
										[
											{"$toDouble":"$place_latitude"},
											lati
										]},
										2
									]}
								,
								{	"$pow":
									[{
										"$subtract":
										[
											{"$toDouble":"$place_longitude"},
											longi
									]},
										2
									]
								}]


						}
					},
				0.1]}}).limit(10)
				if(!searches)
				{
					return res.status(400).send("No result found");
				}
				else
				{
					res.json(searches);
				}
			}


		}





	}catch(err)
	{
		res.send("Error:"+err);
	}


});

module.exports=routes;
