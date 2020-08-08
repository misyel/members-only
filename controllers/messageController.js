const Message = require('../models/messages');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//new message get
exports.newMessageGet = (req, res) => {
    res.render('messageForm', {title: 'new message'})
}

//new message post
exports.newMessagePost = [
    //res.send('new message post')
    //validate 
    body('title').isLength({min: 1}).trim().withMessage('enter a title!'),
    body('message').isLength({min: 1}).trim().withMessage('enter a message!'),

    //sanitize
    sanitizeBody('title').escape(),
    sanitizeBody('message').escape(),

    (req, res, next) => {

        //get errors
        const errors = validationResult(req);

        //check for errors
        if(!errors.isEmpty()){
            res.render('messageForm', {title: 'new message', message: req.body, errors: errors.array()})
        }

        //create new message
        var message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: req.user,
            date: new Date()
        });

        //save message to db
        message.save(function(err){
            if(err){return next(err)}
            
            //redirect if successful
            res.redirect('/');
        })
    }
]

//delete message post
exports.deleteMessage = (req, res, next) => {
    //res.send(req.params.id);

    //find message and remove
    Message.findByIdAndRemove(req.params.id, function(err){
        if(err){return next(err)}

        //redirect if successful
        res.redirect('/');
    })
}