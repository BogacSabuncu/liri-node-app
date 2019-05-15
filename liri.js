require("dotenv").config();
var keys = require("./keys.js");
const axios = require("axios");
const moment = require('moment');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


let artist = "Ariana Grande";
let movieTitle = "Mr Nobody";

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
                let movie = response.data; //base object for the return value
                //display the movie information
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

function getSong(songTitle) {
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (data.tracks.total === 0) {
            console.log("Sorry couldn't find any songs with that title!")
        }
        else {
            const songs = data.tracks.items;
            console.log(`Found ${songs.length} songs with that title.`);
            console.log(`Is it one of these songs you are looking for: `);

            console.log("=========");

            for (let i = 0; i < 5; i++) {

                //display the artists
                let artists = [];
                songs[i].artists.forEach(element => {
                    artists.push(element.name);
                });

                console.log(`   Artist(s): ${artists.join(", ")}`);

                console.log(`   Track: ${songs[i].name}`);
                console.log(`   Album: ${songs[i].album.name}`);
                console.log(`   Listen at Spotify: ${songs[i].external_urls.spotify}`);

                console.log("=========");
            }
        }
    });
}

getMovie(movieTitle);