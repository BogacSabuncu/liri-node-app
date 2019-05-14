require("dotenv").config();
var keys = require("./keys.js");
const axios = require("axios");
const moment = require('moment');

let artist = "Ariana Grande";

//funtion to get concert information
function getConcert(artist) {

    //request URL
    let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

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
                console.log("Couldn't find any concerts for this artist!");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// movieTitle = "Mr Nobody"
// let URL = "http://www.omdbapi.com/?apikey=trilogy&t"+movieTitle;

// axios.get(URL)//axios request for the artist
// .then(function (response) {

//     //if there are available concerts
//     if (response.data.length > 0) {
//        console.log(response);
//     }
//     else { 
//         //if no concerts are found display this
//         console.log("Couldn't find any concerts for this artist!");
//     }
// })
// .catch(function (error) {
//     console.log(error);
// });