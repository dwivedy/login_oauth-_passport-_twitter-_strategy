


var oauthroutes= require('./routes/oauthRoutes.js');
var profileRoutes= require('./routes/profileRoutes');

var passport=require('passport');

var session = require('express-session');

// loading twitter strategy code
var passportSetup= require('./config/passport-twitter-setup');
//var cookieSession=require('cookie-session');
//var cookieParser = require('cookie-parser');

var mongoose=require('mongoose');

var express=require('express');

var hbs = require('express-hbs');

var appSecret=require('./config/applicationSecret');

var server=express();

/*
server.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['errs']

}));
*/
// Use `.hbs` for extensions and find partials in `views/partials`.
server.engine('hbs', hbs.express4({
     defaultLayout: __dirname + '/views/layouts/main.hbs',
    partialsDir: __dirname + '/views/partials',
}));
server.set('view engine', 'hbs');
server.set('views', __dirname + '/views');

//server.use(session({ secret: 'SECRET' }));

//server.use(cookieParser());
/*
server.use(session({
secret : 'foo',
cookie : {
expires: false,
},
}));
*/
// Authentication configuration

server.use(session({

  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla'
}));


//server.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))
server.use(passport.initialize());
server.use(passport.session());


// connect to database mongodb
// use your mongoDB Url to connect eg: mongodb://username:password@ds113098.mlab.com:13098/databasename

mongoose.connect(appSecret.mongoDBSecret.url,function(){

console.log("connected to DB");
});

//routes
server.get('/',function(req,res){
    res.render("home");

});



// logout user
server.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/');

});

// routes from oauth file
server.use('/auth',oauthroutes);

// routes from profile file
server.use('/profile',profileRoutes);

server.listen(3000,function(){
    console.log("port 3000");
});