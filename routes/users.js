var express = require('express');
var router = express.Router();
const userController=require('../Controllers/userController');
const { auth } = require('../Auth/auth');
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/showall',auth,userController.showall)
router.post('/cart/:productId',userController.cart)
router.get('/cartitems',auth,userController.showCart)
router.delete('/remove/:productId',auth,userController.removeFromCart)
router.post('/forget',userController.forget)
// router.get('/reset/:token',auth,auth,userController.reset)
module.exports = router;
