var express = require('express');
var router 	= express.Router();
const controller = require('../controller/index');

// Employee module router  
router.post('/signUp', controller.UserSignUp);
router.post('/login', controller.User_Login);

module.exports = router;