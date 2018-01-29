var passport=require('passport');

var TwitterStrategy=require('passport-twitter');

var Author=require('../models/author-model');

var appSecret=require('./applicationSecret');

// serialize
passport.serializeUser(function(author, done) {
  done(null, author.id);
  console.log("se: "+ author.id);
});

passport.deserializeUser(function(id, done) {
  Author.findById(id, function(err, author) {
      console.log("de: "+ author.id);
    done(null, author);
  });
});


//passport twitter strategy
passport.use(new TwitterStrategy({
    consumerKey: appSecret.twitterSecret.consumerKey, //use your app key
    consumerSecret: appSecret.twitterSecret.consumerSecret, //use your app secret
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log("fired");
    //console.log(profile);

    Author.findOrCreate({ twitterId: profile.id,username:profile.username }, function (err, author) {
        console.log('A new user from "%s" was inserted', author.twitterId);
      return cb(err, author);
    });
  }
));

module.exports=passport;