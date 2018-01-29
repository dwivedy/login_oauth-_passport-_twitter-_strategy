
var passport=require('passport');
var router= require('express').Router();


router.get('/twitter',passport.authenticate('twitter'));


// twitter redirect after permission

router.get('/twitter/callback',passport.authenticate('twitter'),function (req,res) {

//res.send(req.user); // user is property of req Object.so we have to use req.user not req.author.
   // redirect to profile page

    res.redirect('/profile');

});



module.exports=router;