const User = require('../models/users');
const Message = require('../models/messages');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//const async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');


//index
exports.index = (req, res) => {
    Message.find()
    .populate('user')
    .exec(function(err, messages){
        if(err){return next(err)}
        res.render('index', {user: req.user, messages: messages});
    })
    
}
//new user sign up
exports.signupGet = (req, res) => {
    res.render('signupForm', {title: 'sign up'})
};

exports.signupPost = [
    //res.send('not implemented sign up post')

    //validate form fields
    body('firstName').isLength({min: 1}).trim().withMessage('first name is required'),
    body('lastName').isLength({min: 1}).trim().withMessage('last name is required'),
    body('username')
        .isLength({min: 1})
        .trim()
        .withMessage('username is required')
        .custom(value => {
            return User.findOne({ username : value }).then(user => {
              if (user) { 
                  return Promise.reject('Username already taken')
            }
            })
        }),
    body('password').isLength({min: 4}).trim().withMessage('password must be at least 4 characters'),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('passwords must match');
        }
        return true;
    }),

    //sanitize
    sanitizeBody('firstName').escape(),
    sanitizeBody('lastName').escape(),
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),

    (req, res, next) => {

        //get errots
        const errors = validationResult(req);

        //rerender form if there are errors
        if(!errors.isEmpty()){
            return res.render('signupForm', {user: req.body, errors: errors.array()})
        }

        // Hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) { return next(err); }
                let passwordHashed;
            
            //store password to db
            var user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword, 
                membership: false
             })
     
             user.save(function(err){
                 if(err){return next(err);}
                 res.redirect('/login'); //redirect to login
             })
        })


    }

];

exports.loginGet = (req, res, next) => {
    res.render('loginForm', {title: 'login'})
};

exports.loginPost = 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
})

//check if user is logged in
exports.userLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login')
    }
}

//membership get
exports.userBecomeMemberGet = (req, res, next) => {
    res.render('memberForm', {title: 'become a member'})
}

//membership post
exports.userBecomeMemberPost = (req, res, next) => {
    res.send('member post')
}