const express = require('express');
// Lodash utils library
const _ = require('lodash');

const router = express.Router();

const axios = require('axios');
const keyapi = "705897a8";

// On récupere les ionfos des films de l'api
function Informations_omdb(data, id = undefined){
  const m = {
    id: id || _.uniqueId(),
    movie: data.Title,
    yearOfRelease: parseInt(data.Year),
    duration: parseInt(data.Runtime),
    actors: data.Actors.split(", "),
    poster: data.Poster,
    boxOffice: parseInt(data.BoxOffice.slice(1).replace(/,/g, "")),
  	rottenTomatoesScore: null
  };

  const rate = _.find(data.Ratings, ["Source", "Rotten Tomatoes"]);
  if (rate) {
    m.rottenTomatoesScore = parseInt(rate.Value);
  }

  return m;
}

// Create RAW data array
let movies = [{
  id: "0",
  movie: "Wonder Woman",
  yearOfRelease: 2017,
  duration: 141, // en minutes,
  actors: ["Gal Gadot", "Chris Pine", "Connie Nielsen", "Robin Wright"],
  poster: "https://m.media-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg", // lien vers une image d'affiche,
  boxOffice: 412400625, // en USD$,
  rottenTomatoesScore: 93
}];

/* GET movies listing. */
router.get('/', (req, res) => {
  // Get List of movies and return JSON
  res.status(200).json({ movies });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Find movie in DB
  const movie = _.find(movies, ["id", id]);
  // Return movie
  res.status(200).json({
    message: 'Movie found!', movie
  });
});

/* PUT new movie. */
router.put('/', (req, res) => {
	if (req.body.movie === undefined){
		res.status(400).send({"error": "missing parameters"});
	}

	axios.get("http://www.omdbapi.com/", {
		params: {
			t: req.body.movie,
			apikey:keyapi,
		}

	})

	.then((rep)=> {
		if (rep.data.Response === "True"){
			const newmovie = Informations_omdb(rep.data);
			movies.push(newmovie);
			res.send(newmovie);
		}
		else{
			res.status(404).send({"errorNotFound": rep.data.Error});
		}
	})

	.catch((err)=>{
		console.error(err);
        res.status(500).send({"errorServer": err})
	});
  });

/* PUT new movie.
router.put('/', (req, res) => {
  // Get the data from request
  const { movie } = req.body;
  // Create new unique id
  const id = _.uniqueId();
  // Insert it in array (normaly with connect the data with the database)
  movies.push({ movie, id });
  // Return message
  res.json({
    message: `Just added ${id}`,
    movie: { movie, id }
  });
});*/

/* DELETE movie. */
router.delete('/:id', (req, res) => {
  // Get the :id of the movie we want to delete from the params of the request
  const { id } = req.params;

  // Remove from "DB"
  _.remove(movies, ["id", id]);

  // Return message
  res.json({
    message: `Just removed ${id}`
  });
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
  // Get the :id of the movie we want to update from the params of the request
  const { id } = req.params;

	if (req.body.movie === undefined){
		res.status(400).send({"error": "missing parameters"});
	}

	axios.get("http://www.omdbapi.com/", {
		params: {
			t: req.body.movie,
			apikey:keyapi,
		}
	})

	.then((rep)=> {
		if (rep.data.Response === "True"){
			const newmovie = Informations_omdb(rep.data, id);
      movies[_.findIndex(movies, ["id", id])] = newmovie;
			res.send(newmovie);
		}
		else{
			res.status(404).send({"error1": rep.data.Error});
		}
	})

	.catch((err)=>{
		console.error(err);
        res.status(500).send({"error2": err})
	});
});

module.exports = router;
