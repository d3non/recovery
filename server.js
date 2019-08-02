var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var helpers = require('handlebars-helpers')();
var HandlebarsIntl = require('handlebars-intl');
LocalStrategy = require('passport-local').Strategy;

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
/*app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');
});*/

//Models
var models = require("./app/models");

// Express static assets
app.use(express.static("./app/public"));

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//For Handlebars
HandlebarsIntl.registerWith(Handlebars);

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.redirect('signin');
});

//load passport strategy
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//Listening APP at port 5000
app.listen(5000, function (err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)

});