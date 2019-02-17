const mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let url = "mongodb://localhost:27017/lab10";

const Movies = require('../models/movie.js');
const Actors = require('../models/actor.js');

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Could not connect");
    throw err;
  } else {
    console.log("Connected to Database");
  }
});


router.get('/', function (req, res) {
  res.render('index.html')
});

router.get('/newMovie', function (req, res) {
  Actors.find({}, function (err, d) {
    res.render('newMovie.html', {actors: d});
  });
});

router.get('/removeMovie', function (req, res) {
  Movies.find({}, function (err, d) {
    res.render("removeMovie.html", {movies: d});
  });
});

router.get('/listMovies', function (req, res) {
  Movies.find({}, function (err, d) {
    res.render("listMovies.html", {movies: d});
  });
});


router.get('/listActor', function (req, res) {
  Actors.find({}, function (err, d) {
    res.render("listActors.html", {actors: d});
  });
});


router.get('/addActor', function (req, res) {
  res.render('newActor.html');

});

router.get("/updateMovie", function (req, res) {
  Movies.find({}, function (err, d) {
    res.render('updateMovie.html', {movies: d});
  });
});




router.post('/removeMovie', function (req, res) {
  let id = new mongoose.Types.ObjectId(req.body.movieid);
  Movies.deleteOne({_id: id}, function (err) {
    if (err) throw err;
  });
  res.redirect('/listMovies');
});


router.post("/updateMovie", function (req, res) {
  let id = new mongoose.Types.ObjectId(req.body.movieid);
  Movies.updateOne({_id: id}, {$set: {'title': req.body.title}}, function (err) {
    if (err) throw err;
  });
  res.redirect('/listMovies');
});

router.post('/addMovie', function (req, res) {
  let movie = new Movies({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    year: req.body.year,
    actor: req.body.name
  });
  movie.save(function (err) {
    if (err) throw err;
  });
  res.redirect('/listMovies');
});


router.post('/addActor', function (req, res) {
  let actor = new Actors({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    bYear: req.body.bYear
  });
  actor.save(function (err) {
    if (err) throw err;
    console.log("actor added to Database");
  });
  res.redirect('/listActor');
});


router.post('/removeComplete', function(req, res){
  Movies.deleteMany({'status':'Complete'}, function (err) {
    if (err) throw err;
  });
  res.redirect('/listMovies');
});

module.exports = router;

