require("dotenv").config();
var keys = require("./keys.js");
const axios = require("axios");
const moment = require('moment');

let artist = "Ariana Grande";

//funtion to get concert information
function getConcert(artist) {

    //request URL
    let URL = encodeURI("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");

    axios.get(URL)//axios request for the artist
        .then(function (response) {

            //if there are available concerts
            if (response.data.length > 0) {
                let venue = response.data[0].venue;//get the venue information

                let time = moment(response.data[0].datetime).format('LLL');//get the time of the venue and format it
                //display the information
                console.log(`Found ${response.data.length} concerts for this artist/band.`)
                console.log("Information for the next concert for this artist/band is: ");
                console.log(`   The name of the venue: ${venue.name}`);
                console.log(`   The venue is at: ${venue.city}, ${venue.country}`);
                console.log(`   The time of the venue is: ${time}`);
            }
            else {
                //if no concerts are found display this
                console.log("Sorry couldn't find any concerts for this artist!");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovie(movieTitle) {
    let URL = encodeURI("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle);

    axios.get(URL)//axios request for the artist
        .then(function (response) {

            //if there is no movie for that title
            if (response.data.Response === "False") {
                console.log("Sorry couldn't find any movies with that title!")
            }
            else {
                let movie = response.data;
                console.log("Here is the information you are looking for:");
                console.log(`   Movie Title: ${movie.Title}`);
                console.log(`   Year Released: ${movie.Year}`);
                console.log(`   IMDB Rating: ${movie.Ratings[0].Value}`);
                console.log(`   Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
                console.log(`   Country: ${movie.Country}`);
                console.log(`   Languages: ${movie.Language}`);
                console.log(`   Plot: ${movie.Plot}`);
                console.log(`   Actors: ${movie.Actors}`);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}