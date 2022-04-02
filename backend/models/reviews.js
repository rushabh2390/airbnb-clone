/* revies schema model whihc take place_id, reviewer id, comment and log details (i.e.created_at, update_at, deleted_at) */
const mongoose=require('mongoose')
const Schema = mongoose.Schema
const reviewSchema= new mongoose.Schema({
	review_comments:{
		type:String,
		required:true,
		trim: true
	},
	review_place_id:
	{
		type:Schema.Types.ObjectId,
		required:true,
		ref: "places"
	},
	reviewer_id:
	{
		type:Schema.Types.ObjectId,
		required:true,
		ref: "users"
	},
	review_Created_at:
	{
		type:String
	},
	review_Updated_at:
	{
		type:String
	},
	review_Deleted_at:
	{
		type:String
	}
})
module.exports= mongoose.model("reviews",reviewSchema);
