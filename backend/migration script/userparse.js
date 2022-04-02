var dbcon= require('./dboperation')
var csvtojson = require('csvtojson');
/* Creating Function */
(async () => {
	
	let docs=await dbcon.getid("roles",["role_name"])
	let roles=docs.reduce((role_data, item) => {
		role_data[item.role_name] = item._id;
		
        return role_data;
    }, {})
	const data = await csvtojson().fromFile('reviews.csv');
	let users = Object.values(data.reduce((users, item) => {
		if(!Reflect.apply(Object.prototype.hasOwnProperty,users,[item.reviewer_id])) {
			users[item.reviewer_id] = {
				id:item.reviewer_id,
				user_name:item.reviewer_name,
				user_role_id:roles["user"],
				user_email:"",
				user_password:"",
				user_Created_at:Date.now(),
				user_Updated_at:"",
				user_Deleted_at:""
			}
		}

		return users;
	}, {}));
	users[0]={
		id:-1,
		user_name:"admin",
		user_role_id:roles["admin"],
		user_email:"admin@example.com",
		user_password:"admin",
		user_Created_at:Date.now(),
		user_Updated_at:"",
		user_Deleted_at:""
	}
	await dbcon.insertuserdata(users);
	console.log("User data are inserted")

})()
