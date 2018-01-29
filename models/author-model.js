var mongoose=require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema=mongoose.Schema;

var authorSchema= new Schema({
    username:String,
    twitterId:String
});

authorSchema.plugin(findOrCreate);

var Author=mongoose.model('author',authorSchema);

module.exports=Author;