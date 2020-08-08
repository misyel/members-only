var express = require('express');
const { signupGet } = require('../controllers/userController');
var router = express.Router();
var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');

//home page
router.get('/', userController.index);

//user routes
router.get('/sign-up', userController.signupGet);
router.post('/sign-up', userController.signupPost);
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/new-member', userController.userLoggedIn, userController.userBecomeMemberGet);
router.post('/new-member', userController.userBecomeMemberPost);
router.get('/admin', userController.userLoggedIn, userController.adminGet);
router.post('/admin', userController.adminPost);
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

//message routes
router.get('/new-message', userController.userLoggedIn, messageController.newMessageGet);
router.post('/new-message', messageController.newMessagePost);
router.post('/delete-message/:id', messageController.deleteMessage);




module.exports = router;
