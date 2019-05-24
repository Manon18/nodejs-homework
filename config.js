const mongoose = require('mongoose');
let data = require('./users/userlist.json');

mongoose.connect('mongodb://localhost:27017/fighters_app', { useNewUrlParser: true });
let db = mongoose.connection;

let userlistSchema = new mongoose.Schema({
  _id: String,
  name: String,
  health: Number,
  attack: Number,
  defense: Number,
  source: String
});

let collectionName = 'userlist';
let Userlist = mongoose.model('Userlist', userlistSchema, collectionName);

db.collection('userlist').insertMany(data, function(err, result) {
  if(err) {
    console.log(err);
    console.log('Something was wrong');
  } else {
    console.log(result);
  }
});

module.exports = Userlist;
