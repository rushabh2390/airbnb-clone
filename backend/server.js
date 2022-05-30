/*express server js*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const url = process.env.MONGO_URL+"/airbnbdb" || "mongodb://username:password@mongodb:27017/airbnbdb";
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const  app = express();

mongoose.connect(url,{useMongoClient:true})
const con=mongoose.connection

con.on('open',function(){
})



const usersRouter=require("./routes/users")
const placesRouter=require("./routes/places")
const reviewsRouter=require("./routes/reviews")
const SearchRouter=require("./routes/searches")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/users',usersRouter);
app.get('/', (req, res) => {
})
app.use('/places',placesRouter);
app.use('/reviews',reviewsRouter);
app.use('/searches',SearchRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set('trust proxy', true);

var server = app.listen(9000, function () {
})
module.exports = server;
