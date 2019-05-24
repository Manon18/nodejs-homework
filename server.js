const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = 3000;
let db = require('./config.js');
let Userlist = require('./config.js');

app.use(express.static(__dirname + '/view'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
})

app.get('/', function(request, response){
  response.sendFile(__dirname + '/view/index.html');
});

app.get('/fighters', function (req, res) {
  Userlist.find({})
    .then(eachFighter => {
      res.json(eachFighter);
      console.log(eachFighter);
    })
    .catch(err => {
      new Error(err);
    });
});

app.get('/fighters/:fighter_id', function(req, res) {
  Userlist.findById(req.params.fighter_id)
    .then((err, fighter) => {
      if(err) {
        res.send(err);
      } else {
        res.json(fighter);
      }
    })
})

app.post('/fighters', function(req, res) {
  console.log(req.body);

  Userlist.create({
    _id: req.body._id,
    name: req.body.name,
    health: req.body.health,
    attack: req.body.attack,
    defense: req.body.defense,
    source: req.body.source
  })
  .then(fighter => {
    res.json(fighter);
  })
  .catch(err => {
    console.log(err);
  })
});

app.put('/fighters/:fighter_id', function(req, res) {
  let modifiedFighters = {
    name: req.body.name,
    health: req.body.health,
    attack: req.body.attack,
    defense: req.body.defense,
    source: req.body.source
  }

  Userlist.findOneAndUpdate({_id: req.params.fighter_id}, modifiedFighters, {upsert: true, new: true})
  .then(fighter => {
    res.json(fighter);
  })
  .catch(err => {
    console.log(err);
  })
});

app.delete('/fighters/:fighters_id', function(req, res) {
  Userlist.deleteOne({_id: req.params.fighters_id})
  .then(fighter => {
    console.log(req.params.fighter_id);
    res.json(fighter);
  })
  .catch(err => {
    console.log(err);
  })
});
 
app.listen(port);
