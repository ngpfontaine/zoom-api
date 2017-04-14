var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var syncrequest = require('sync-request');
var path = require('path');

// APP INIT PARAMS
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// REST OF INIT
var zoom_key = process.env['ZOOM_API_KEY'];
var zoom_sec = process.env['ZOOM_API_SEC'];
var router = express.Router();

// SET ROUTES
router.get('/', function(req, res) {
	res.render('home', {title: 'Welcome'});
});

router.get('/users', function(req, res) {
	res.render('users', {title: 'User Management'});
});

router.post('/users', function(req, res) {
	console.log(req.body);
	// MAKE REST CALL TO ZOOM TO CREATE USERS
	var options = {
		qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON",
		email: req.body.email, type: 1}
	};

	// MAKE SYNCHRONOUS REQ TO ZOOM TO CREATE MEETING
	var syncres = syncrequest('POST',"https://api.zoom.us/v1/user/create",options);
	var response=JSON.parse(syncres.getBody('utf8'));

	console.log(response);

	res.redirect('/');

});
