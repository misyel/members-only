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

//message routes
router.get('/new-message', userController.userLoggedIn, messageController.newMessageGet);
router.post('/new-message', messageController.newMessagePost)




module.exports = router;
