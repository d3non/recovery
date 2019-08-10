var authController = require('../controllers/authcontroller.js');


module.exports = function (app, passport) {
    var main = require('../models/main.js');

    //GET
    app.get('/signup', authController.signup)

    app.get('/signin', authController.signin)

    app.get('/logout', authController.logout)

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    //app.get('/credits', isLoggedIn, authController.credits);

    //POST
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
    ));
    
    app.post('/signup', passport.authenticate('local-signup', {
        sucessRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
    ));

    /*app.post('/signup', (req, res, next) => { 
        passport.authenticate('local-signup', {
        sucessRedirect: '/dashboard',
        failureRedirect: '/signin'
        })(req, res, next);
    });*/

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }

    app.get('/credits', function (req, res) {
      main.selectAll(function(data) 
      {
        var hbsObject = { credits: data };
        console.log(hbsObject);
        res.render('credits', hbsObject);
      });
    });

    app.get('/agents', authController.agents);

}

