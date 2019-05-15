//requirements
require("dotenv").config();
var keys = require("./keys.js");
const axios = require("axios");
const moment = require('moment');
const inquirer = require('inquirer');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//trial variables
let artist = "Ariana Grande";
let movieTitle = "Mr Nobody";
let songTitle = "bloodline";

//to not ask another question before being answered
let isAnswered = false;

//funtion to get concert information
function getConcert(artist) {

    //request URL
    let URL = encodeURI("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");

    axios.get(URL)//axios request for the artist
        .then(function (response) {

            //if there are available concerts
            if (response.data.length > 0) {

                console.log(`*** Found ${response.data.length} concerts for this artist/band ***`)
                console.log("Here are the information for the next 3 concerts for this artist/band ");
                console.log("=========");

                for(let i = 0; i < 3; i++){

                let venue = response.data[i].venue;//get the venue information

                let time = moment(response.data[i].datetime).format('LLL');//get the time of the venue and format it
                //display the information
                

                console.log(`   The name of the venue: ${venue.name}`);
                console.log(`   The venue is at: ${venue.city}, ${venue.country}`);
                console.log(`   The time of the venue is: ${time}`);
                console.log("=========");
                }
            }
            else {
                //if no concerts are found display this
                console.log("Sorry couldn't find any concerts for this artist!");
            }
            askLiri();
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
                console.log("=========");
                console.log("Here is the information you are looking for:");
                console.log(`   Movie Title: ${movie.Title}`);
                console.log(`   Year Released: ${movie.Year}`);
                console.log(`   IMDB Rating: ${movie.Ratings[0].Value}`);
                console.log(`   Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
                console.log(`   Country: ${movie.Country}`);
                console.log(`   Languages: ${movie.Language}`);
                console.log(`   Plot: ${movie.Plot}`);
                console.log(`   Actors: ${movie.Actors}`);
                console.log("=========");
            }

            askLiri();
        })
        .catch(function (error) {
            askLiri();
        });
}

function getSong(songTitle) {
    //spotify search function
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //if there are no tracks display this message
        if (data.tracks.total === 0) {
            console.log("Sorry couldn't find any songs with that title!")
        }
        else {
            //How many song have been found
            const songs = data.tracks.items;
            console.log(`*** Found ${songs.length} songs with that title ***`);
            console.log(`Is it one of these songs you are looking for: `);

            console.log("=========");

            //display the first 5 songs
            for (let i = 0; i < 5; i++) {

                //combine all the artists in to one array
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
        askLiri();
    });
}

//to get the usr input for
function getUsrInput(inputQuestion, category) {
    inquirer.prompt([
        {
            type: "input",
            message: inputQuestion,
            name: "usrInput",
            //validate that something is entered
            validate: function (input) {
                if (input === "") {
                    return "You must enter something!"
                }
                else {
                    return true;
                }
            }
        }
    ]).then(function (answer) {
        //if its a song call getSong function
        if (category == 0) {
            getSong(answer.usrInput);
        }
        //if its a movie call getMovie function
        else if (category == 1) {
            getMovie(answer.usrInput);
        }
        //if its a concert call getConcert function
        else if (category == 2) {
            getConcert(answer.usrInput);
        }
        else {
            console.log("Opps 2");
        }
    });
}

function askLiri() {
    //give the user three choices to pick from
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want me to do?",
            choices: ["Find a Song", "Find a Movie", "Find a Concert", "Quit"],
            name: "choice"
        }
    ]).then(function (answer) {
        //invokes the getUsrInput function to get a valid usr input
        if (answer.choice == "Find a Song") {
            getUsrInput("Enter a song tittle", 0);
        }
        else if (answer.choice == "Find a Movie") {
            getUsrInput("Enter a movie tittle", 1);
        }
        else if (answer.choice == "Find a Concert") {
            getUsrInput("Enter an artist", 2);
        }
        else {
            console.log("Glad I can help!");
            return 0;
        }
    });
}

askLiri();
