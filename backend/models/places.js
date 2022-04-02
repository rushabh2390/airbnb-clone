/*places model whihc have place_name,place_summary, place_street,place_city, place_state,place_country
	no-of_reviewm first_review_date, last_review_date and log(cretaed_on,updated_on, deleted_on)
*/
const mongoose=require('mongoose')
const placeSchema= new mongoose.Schema({
	place_name:{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_summary:{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_street:
	{
		type:String,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_city:
	{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_state:
	{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_country:
	{
		type:String,
		required:true,
		trim: true,
        minLength: 4,
        maxLength: 15
	},
	place_number_of_reviews:
	{
		type:String
	},
	place_first_review:
	{
		type:String
	},
	place_last_review:
	{
		type:String
	},
	place_longitude:
	{
		type:String
	},
	place_latitude:
	{
		type:String
	},
	place_Created_at:
	{
		type:Date
	},
	place_Updated_at:
	{
		type:Date
	},
	place_Deleted_at:
	{
		type:Date
	}
})
module.exports= mongoose.model("places",placeSchema);
