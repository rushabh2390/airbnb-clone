const express = require('express');
const routes=express.Router();
const db = require("../models");
const mongoose=require('mongoose')
routes.get('/',async function (req,res){
	try{
		const users=await db.users.find({},{"user_Updated_at":0,"user_Deleted_at":0}).populate('user_role_id','-_id -role_Created_at -_v -role_Updated_at -role_Deleted_at').limit(50)
		if(users.length==0)
		{
			return res.status(400).send("No users");
		}
		else
		{
			res.json(users);
		}



	}catch(err)
	{
		res.send("Error:"+err);
	}


});
/*this code find user with username and return its details if not then username is not found*/
routes.get('/:username',async function (req,res){
	try{
	const user=await db.users.find({"user_name":req.params["username"]},{"user_Created_at":0,"user_Updated_at":0,"user_Deleted_at":0,"__v":0}).populate({path:'user_role_id',select:'-_id -role_Created_at -_v -role_Updated_at -role_Deleted_at'})
		if(user.length==0)
		{

			return res.status(400).send("username is not found");

		}
		else
		{
			res.json(user);
		}



	}catch(err)
	{
		res.send("Error:"+err);
	}


});

/*this code register user with unique username and email*/
routes.post('/register',async function (req,res){
	try{
		const users=await db.users.findOne({user_name:req.body.username}).count();
		if(users!=0)
		{
			return res.status(400).send("username is already exist");
		}
		else{
			const isexistemail= await db.users.findOne({user_email:req.body.email}).count()
			if(isexistemail!=0)
			{
				return res.status(400).send("email is already exist");
			}
			else
			{
				let	 get_roles= await db.roles.findOne({role_name:req.body.role},{role_name:1});
				let roles=JSON.parse(JSON.stringify(get_roles))
				let user = new db.users({
				user_name: req.body.username,
				user_email: req.body.email,
				user_password: req.body.password,
				user_role_id:roles["_id"],
				user_Created_at:Date.now()});
				await user.save();
				res.send("new user is created");
			}

		}



	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});

/*this code update user's details except email and username*/
routes.put('/:userid',async function (req,res){
	try{
		if(req.params.userid)
		{
			var id=new mongoose.Types.ObjectId(req.params.userid);
			const users=await db.users.findOne({"_id":id}).count();
			if(users==0)
			{
				return res.send("username is not found");
			}
			else{

				let	 get_roles= await db.roles.findOne({role_name:req.body.role},{role_name:1});
				let roles=JSON.parse(JSON.stringify(get_roles))
				var name=req.body.username;
				var pwd=req.body.password;
				var roleid=roles["_id"];
				await db.users.findOneAndUpdate(
				{"_id":id},
				{
					user_name:name,
					user_password: pwd,
					user_role_id:roleid,
					user_Updated_at:Date.now()
				},{new: true});
				res.send("data is succesfully updated");
			}
		}
		else
		{
			return res.status(400).send("no user");
		}






	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});

/*this code delete user on bases of username*/
routes.delete('/:userid',async function (req,res){
	try{
		if(req.params.userid)
		{

			var id=new mongoose.Types.ObjectId(req.params.userid);
			const users=await db.users.findOne({"_id":id}).count();
			if(users==0)
			{
				return res.send("username is not found");
			}
			else
			{
				await db.users.remove({"_id":id})
				res.send("username  is deleted");
			}
		}
		else
		{
			return res.status(400).send("no user");
		}






	}catch(err)
	{
		res.send("Error:"+err.message);
	}


});

module.exports=routes;
