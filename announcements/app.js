var express = require('express');
var app = express();
var morgan = require('morgan');

//Configuration
var port = {
	development: 8100,
	test: 8101,
	production: 8102 
}

app.set('port', process.env.PORT || port[app.get('env')]);

//Middleware for parsing POST bodies
app.use(morgan('dev'));

//////////////
/// Routes ///
//////////////

//Allow Cross-Domain Requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-access-admin-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var announcements = [
	"Hi, today will be a very sunny day.",
	"Wear a jacket, today will be very cold!",
	"Rainy! Make sure you bring your rain coat with you today.",
	"Humid weather alert.  Bring a change of clothes today because you will be sweating a lot!",
	"It's good to be in Saigon!  Try out the banh mi.",
	"This is the greatest PWA example ever!  Make sure you donate money to the author, minimum $100 USD.",
	"Have you watched Justice League?  It's ok, just another action movie..."
]

app.get('/', function(request, response) {
	response.send("Welcome to the Announcements API.");
});

app.get('/announcement', function (request, response) {
	response.send({message: announcements[getRandomInt(0,6)]});
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:'+
		app.get('port') + '; press Ctrl-C to terminate.');

		console.log("NODE_ENV="+app.get('env'));

});

module.exports = app;