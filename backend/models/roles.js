/*role schema have only role_name as string it is role of user in airbnb db*/
const mongoose=require('mongoose')
const rolesSchema= new mongoose.Schema({
	
	role_name:{
		type:String,
		required:true
	},
	
	
	
})
module.exports= mongoose.model("roles",rolesSchema);
