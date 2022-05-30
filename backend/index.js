/*express server js*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const url = process.env.MONGO_URL || "mongodb://localhost/airbnbdb";
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
app.use('/users',usersRouter);
app.use('/places',placesRouter);
app.use('/reviews',reviewsRouter);
app.use('/searches',SearchRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set('trust proxy', true);
app.get('/', (req, res) => {
  res.json({
      message: 'Behold The MEVN Stack!'
  });
});
var server = app.listen(9000, function () {
})
module.exports = server;
