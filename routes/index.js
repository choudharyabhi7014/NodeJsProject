var express = require('express');
var router = express.Router();
const admincontroller=require('../Controllers/adminController')
/* GET home page. */
router.post('/add',admincontroller.add)
router.get('/showall',admincontroller.showAll)
router.put('/update/:id',admincontroller.update)
router.delete('/remove/:id',admincontroller.deleteProduct);
// router.post('/register',admincontroller.register)
router.post('/login',admincontroller.login)
router.get('/auth',admincontroller.authenticateToken)
module.exports = router;
