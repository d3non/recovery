var exports = module.exports = {}

exports.signup = function (req, res) {

    res.render('signup')
}

exports.signin = function (req, res) {

    res.render('signin');

}

exports.dashboard = function (req, res) {

    res.render('dashboard');

}

exports.tables = function (req, res) {

    res.render('tables');

}

exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');

    });

}

