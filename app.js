const path = require('path');
const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();



// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
//app.use(expressLayouts);
//app.set('view engine', 'ejs');

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

// Handlebars
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express static assets
app.use(express.static("public"));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));