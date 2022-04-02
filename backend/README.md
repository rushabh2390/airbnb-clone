to run script follwing packages need to be insatlled in node js <br/>
npm install csvtojson<br/>
npm install mongodb<br/>
npm install mongoose<br/>
npm install joi<br/>
npm install --save express-validator<br/>
npm install geoip-lite<br/>

Script must be run in follwing orders;<br/>
1. dbcreation.js<br/>
	It will create a json named airbnbdb and create collections named users,roles,reviews,places and booking.<br/>
	It will also insert 2 document in role (i.e. role name users and admin).
2. userparse.js<br/>
	it will insert one document into users with role as 'admin'. after that it will iterate over reviews.csv file and get reviewer's id 
	,name <br/> and insert into document into users collection with role as 'user'<br/>
	here user_role_id store the id of documents from roles collection having role name as admin or users.<br/>
3. listingsparse.js<br/>
	it will iterate over listings.csv file and insert all data into places collection.<br/>
4. reviewsparse.js<br/>
	it will iterate over reviews.csv file and insert all data into reviews collection.<br/>
	here reviewer_id is object id of document from users's collection,<br/>
	and review_listing_id is object id  of document from places's collection.<br/>

<b>Notes:</b> userparse.js and reviewsparse.js take approximation 1 to 1.5 minutes for execution.
	
	