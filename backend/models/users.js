const mongoose=require('mongoose')
const Schema = mongoose.Schema
const userSchema= new mongoose.Schema({
	user_name:{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	user_email:{
		type:String,
		required:true,
		unique:true,
		trim: true,
	},
	user_password:{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	user_role_id:
	{
		type:Schema.Types.ObjectId,
		ref: "roles"
	},
	user_Created_at:
	{
		type:Date,
	},
	user_Updated_at:
	{
		type:Date,
	},
	user_Deleted_at:
	{
		type:Date,
	}
})
module.exports= mongoose.model("users",userSchema);