require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");



var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join("+");

function spotifyThis(input){
    spotify
  .search({ type: 'track', query: input, limit: 1 })
  .then(function(response) {
    console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
  })
  .catch(function(err) {
    console.log(err);
  });

}


function concertThis(){

}
function movieThis(){
  axios.get("http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log(response.data);
    
    console.log("The movie's rating is: " + response.data.imdbRating);
    console.log("The movie's Title: " + response.data.Title);
    console.log("The movie's Release Year: " + response.data.Year);
    console.log("Produced in the: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Movie Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);

}
function doWhatItSays(){

}

switch(whatToDo){

case "spotify-this-song":
    spotifyThis(userInput);
    break;
case "movie-this":
    movieThis(userInput);
    break;
case "concert-this":
    concertThis(userInput);
    break;
case "do-what-it-says":
    doWhatItSays(userInput);
    break;




}
