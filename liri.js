require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");



var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join("+");

function spotifyThis(){
  if (userInput === ""){
  userInput = "The Sign"
  spotifyInput();
  }else{
    spotifyInput();
  }

}
   
  
  
  function spotifyInput(input){
  
  spotify
  .search({ type: 'track', query: input, limit: 1 })
  .then(function(response) {

    console.log("");
    console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
    
  })
  .catch(function(err) {
    console.log(err);
  });

}


function concertThis(){
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response){
    data = response.data
    for (let index = 0; index < data.length; index++) {
      console.log("");
      
      console.log("Artist: " + data[index].lineup);
      console.log("Venue: " + data[index].venue.name);
      
      
      
    }
          
          





  })


}
function movieThis(){
  axios.get("http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
   
    
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
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(", ");      
    whatToDo = dataArr[0];
    userInput = dataArr[1];      
    whatsUp();
  })

}
function whatsUp(){
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
}
whatsUp();
// function that appends user inputed value in to log.txt file //
fs.appendFile("log.txt", userInput + ', ', function (err) {
    if (err) {
        console.log(err);

    } else {
        console.log("Info added");

    }
})
