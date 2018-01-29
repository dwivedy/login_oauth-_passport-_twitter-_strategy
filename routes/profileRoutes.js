
var router= require('express').Router();

var hasUserSession= function(req,res,next){
    if(!req.user){
        res.redirect('/'); // return to home page if req.user does not exist.
    }else{
        next();
    }

};


router.get('/',hasUserSession,function (req,res) {
    res.render('profile',{user:req.user});
});



module.exports=router;