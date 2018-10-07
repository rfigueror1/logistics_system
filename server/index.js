var express = require('express');
var app = express();
var db = require('./../db/db.js')
const bodyParser = require('body-parser'); //to parse json that comes in the body of the request

app.use(express.static(__dirname + '/../dist'));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('hello world1');
});

app.post('/trucks', function(req, res){
  var name = req.params.name;
  var lat = req.params.lat;
  var longitud = req.params.longitud;
  var company = req.params.company;
  db.create_transport(name, lat, longitud, company, (err,res) => {
  	if(err){
  		console.log(err)
  	}else{
  		res.status(201).send();
  	}
  })
});

app.get('/trucks/:id', function(req, res){
  var id = Number(req.params.id.replace(':',''));
  db.locate_transport(id, (err,results) => {
    if(err){
      console.log(err)
    }else{
      res.json(results);
    }
  })
});

app.listen(3003);
