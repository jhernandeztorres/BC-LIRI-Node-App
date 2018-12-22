require("dotenv").config();
const keys = require('./keys');
const fs = require("fs");

const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");

const spotify = new Spotify(keys.spotify);

const [node, file, action, ...args] = process.argv;
let joined = args.join("+");
console.log(keys.omdb);
switch (action) {
    case "concert-this":
        concert(joined);
        break;

    case "spotify-this-song":
        spotifyThis(joined);
        break;

    case "movie-this":
        movie(joined);
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. concert-this 'any band/singer name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n");
}

function concert(band) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js concert-this ' + band, function (err) {
        if (err) {
            console.log(err);
        }
    })
    // waiting on apiKey
}

function spotifyThis(song) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js spotify-this-song ' + song, function (err) {
        if (err) {
            console.log(err);
        }
    })

    let search;
    if (!song) {
        search = 'The Sign Ace of Base';
    } else {
        search = song;
    }

    spotify.search({
        type: 'track',
        query: search
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            let songInfo = data.tracks.items[0];
            if (!songInfo) {
                console.log("No song info retrieved. Check the song spelling and try again.");
            } else {
                let outputStr = '\r\n\r\n\r\n' +
                    '-----------------------------------\n' +
                    'Song Information:\n' +
                    '------------------------------------\n\n' +
                    'Song Name: ' + songInfo.name + '\n' +
                    'Artist: ' + songInfo.artists[0].name + '\n' +
                    'Album: ' + songInfo.album.name + '\n' +
                    'Preview Here: ' + songInfo.preview_url + '\n';
                console.log(outputStr);
            }
        }
    })
}

function movie(movieTitle) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js movie-this ' + movieTitle, function (err) {
        if (err) {
            console.log(err);
        }
    })
    if (!movieTitle) {
        movieTitle = 'Mr Nobody';
    }
    let queryUrl = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=' + keys.omdb.apiKey;
    axios.get(queryUrl)
        .then((result) => {
            const {
                Title,
                Year,
                imdbRating,
                Country,
                Language,
                Plot,
                Actors
            } = result.data;
            const tomatoRating = result.data.Ratings[1].Value;
            let movieInfo = `\r\n\r\n\r\n
                            ----------------------------------------------
                                            Movie Information
                            ----------------------------------------------
                            Title: ${Title} 
                            Year: ${Year} 
                            Country: ${Country} 
                            Language: ${Language} 
                            Plot: ${Plot} 
                            Actors: ${Actors} 
                            IMDB Rating: ${imdbRating} 
                            Rotten Tomatoes Rating:  ${tomatoRating}`;
            console.log(movieInfo);
        })
}

function doIt() {
    fs.readFile("random.txt", "UTF8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            let txtString = data.split(',');
            let txtAction = txtString[0].trim();
            let txtInput = txtString[1].trim();

            switch (txtAction) {
                case "concert-this":
                    concert(txtInput);
                    break;

                case "spotify-this-song":
                    spotifyThis(txtInput);
                    break;

                case "movie-this":
                    movie(txtInput);
                    break;
            }
        }

    })
}