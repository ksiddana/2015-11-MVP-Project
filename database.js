var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/github');

var db = mongoose.connection;
// var User;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB:");

});
  //parent doc
  var UserSchema = mongoose.Schema({
    // username: { type:String, index:{ unique:true } }
    username: String,
    name: String,
    image: String,
    blog: String,
    followers: Number,
    following: Number,
    location: String,
    updated_at: Date
  });


  var User = mongoose.model('User',UserSchema);
  //var Message = mongoose.model('Message',MessageSchema);

/*  User.remove({}, function(err) { 
   console.log('collection removed') 
  });*/

/*  User.remove({}).then(function(err){
    console.log('promised remove');
  })*/

/*  var user = new User({name:'fred'});
  //var message = new Message({text:"hi"});

  
  user.messages.push({text:'hi',date:"1-1-1"});


  user.save(function(err,user){
    if (err) return console.error(err);
    // console.log('promised save', user);
    return user;
  })
  .then(function(user){
      user.find().then(function(users){
        // console.log(users);
      })
  });*/

  
  //exports.saveUser = User;
var getUser = function(){
    //must return a promise

    return User.find({},function(err,data){
      if(err){
        console.log(err);
      }
    }).then(function(data) {
      return data;
    });
}

var saveUser = function(userObj){
    console.log('stored', userObj)
    
    var user = new User(userObj);

    // user.save();
    user.save(function(err,user){
      if (err) return console.error(err);
      console.log('promised save', user);
      return user;
    })
}

module.exports = {
  users : User,
  saveUsers : saveUser,
  getUsers : getUser
}
