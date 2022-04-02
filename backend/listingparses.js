/*
	this code take listings.csv file as input and store the data inside mongo place's collection
*/
var dbcon= require('./dboperation');
var csvtojson = require('csvtojson');
try{
(async () => {
	var data= await csvtojson().fromFile("listings.csv")
	var places=Object.values(
	data.reduce((places,place)=>
	{
			places[place.id]={
			place_id:place.id
				,place_listing_url:place.listing_url
				,place_scrape_id:place.scrape_id
				,place_last_scraped:place.last_scraped
				,place_name:place.name
				,place_summary:place.summary
				,place_space:place.space
				,place_description:place.description
				,place_experiences_offered:place.experiences_offered
				,place_neighborhood_overview:place.neighborhood_overview
				,place_notes:place.notes
				,place_transit:place.transit
				,place_access:place.access
				,place_interaction:place.interaction
				,place_house_rules:place.house_rules
				,place_thumbnail_url:place.thumbnail_url
				,place_medium_url:place.medium_url
				,place_picture_url:place.picture_url
				,place_xl_picture_url:place.xl_picture_url
				,place_host_id:place.host_id
				,place_street:place.street
				,place_neighbourhood:place.neighbourhood
				,place_neighbourhood_cleansed:place.neighbourhood_cleansed
				,place_neighbourhood_group_cleansed:place.neighbourhood_group_cleansed
				,place_city:place.city
				,place_state:place.state
				,place_zipcode:place.zipcode
				,place_market:place.market
				,place_smart_location:place.smart_location
				,place_country_code:place.country_code
				,place_country:place.country
				,place_latitude:place.latitude
				,place_longitude:place.longitude
				,place_is_location_exact:place.is_location_exact
				,place_property_type:place.property_type
				,place_room_type:place.room_type
				,place_accommodates:place.accommodates
				,place_bathrooms:place.bathrooms
				,place_bedrooms:place.bedrooms
				,place_beds:place.beds
				,place_bed_type:place.bed_type
				,place_amenities:place.amenities
				,place_square_feet:place.square_feet
				,place_price:place.price
				,place_weekly_price:place.weekly_price
				,place_monthly_price:place.monthly_price
				,place_security_deposit:place.security_deposit
				,place_cleaning_fee:place.cleaning_fee
				,place_guests_included:place.guests_included
				,place_extra_people:place.extra_people
				,place_minimum_nights:place.minimum_nights
				,place_maximum_nights:place.maximum_nights
				,place_calendar_updated:place.calendar_updated
				,place_has_availability:place.has_availability
				,place_availability_30:place.availability_30
				,place_availability_60:place.availability_60
				,place_availability_90:place.availability_90
				,place_availability_365:place.availability_365
				,place_calendar_last_scraped:place.calendar_last_scraped
				,place_number_of_reviews:place.number_of_reviews
				,place_first_review:place.first_review
				,place_last_review:place.last_review
				,place_review_scores_rating:place.review_scores_rating
				,place_review_scores_accuracy:place.review_scores_accuracy
				,place_review_scores_cleanliness:place.review_scores_cleanliness
				,place_review_scores_checkin:place.review_scores_checkin
				,place_review_scores_communication:place.review_scores_communication
				,place_review_scores_location:place.review_scores_location
				,place_review_scores_value:place.review_scores_value
				,place_requires_license:place.requires_license
				,place_license:place.license
				,place_jurisdiction_names:place.jurisdiction_names
				,place_instant_bookable:place.instant_bookable
				,place_cancellation_policy:place.cancellation_policy
				,place_require_guest_profile_picture:place.require_guest_profile_picture
				,place_require_guest_phone_verification:place.require_guest_phone_verification
				,place_calculated_host_listings_count:place.calculated_host_listings_count
				,place_reviews_per_month:place.reviews_per_month
				,place_Created_at:Date.now()
				,place_Updated_at:""
				,place_Deleted_at:""
			}
			
		return places
		},{}));
		await dbcon.insertplacedata(places);
		console.log("place data are inserted")
	})();
		
}

catch(error){
	console.log(error);
	
}	
