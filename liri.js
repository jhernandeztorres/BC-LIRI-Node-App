require("dotenv").config();
const inquirer = require("inquirer");
const keys = require('./keys');
const fs = require("fs");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");

const spotify = new Spotify(keys.spotify);

function concert(input) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js concert-this ' + input, function (err) {
        if (err) {
            console.log(err);
        }
    })

    if (!input) {
        input = 'Blue October';
    }
    let queryUrl = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=' + keys.band.apiKey + '&date=upcoming';
    axios.get(queryUrl)
        .then((result) => {
            // console.log(result.data);
            if (!result.data[0]) {
                console.log("No upcoming shows for this artist.");
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    input = input.toUpperCase();
                    const {
                        country,
                        city,
                        name,
                        region
                    } = result.data[i].venue;
                    const lineup = result.data[i].lineup;
                    const dateTime = moment(result.data[i].datetime).format("dddd, DD MMMM YYYY");
                    let bandInfo = `\r\n
-----------------------------------------------------
        Upcoming Show for ${input}
-----------------------------------------------------
Lineup: ${lineup}
Name: ${name}
City: ${city}
State: ${region}
Country: ${country}
Date: ${dateTime}
\r\n`
                    console.log(bandInfo);
                };
            };
        });
}

function spotifyThis(input) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js spotify-this-song ' + input, function (err) {
        if (err) {
            console.log(err);
        }
    })

    let search;
    if (!input) {
        search = 'The Sign Ace of Base';
    } else {
        search = input;
    }

    spotify.search({
        type: 'track',
        query: search
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < data.tracks.items.length; i++) {
                let songInfo = data.tracks.items[i];
                let songName = songInfo.name;
                let albumName = songInfo.album.name;
                let songPreview = songInfo.preview_url;
                for (let j = 0; j < songInfo.artists.length; j++) {
                    let artistName = songInfo.artists[j].name;
                    if (!songInfo) {
                        console.log("No song info retrieved. Check the song spelling and try again.");
                    }
                    if (!songName) {
                        songName = "N/A";
                    } else {
                        songName = songName;
                    }
                    if (!artistName) {
                        artistName = "N/A";
                    } else {
                        artistName = artistName;
                    }
                    if (!albumName){
                        albumName = "N/A";
                    } else {
                        albumName = albumName;
                    }
                    if (!songPreview){
                        songPreview = "N/A";
                    } else {
                        songPreview = songPreview;
                    }
                    let outputStr = '\r\n' +
                        '-----------------------------------\n' +
                        'Song Information:\n' +
                        '------------------------------------\n\n' +
                        'Song Name: ' + songName + '\n' +
                        'Artist: ' + artistName + '\n' +
                        'Album: ' + albumName + '\n' +
                        'Preview Here: ' + songPreview + '\n';
                    console.log(outputStr);
                }
            }
        }
    })
}

function movie(input) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js movie-this ' + input, function (err) {
        if (err) {
            console.log(err);
        }
    })
    if (!input) {
        input = 'Mr Nobody';
    }
    let queryUrl = 'https://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=' + keys.omdb.apiKey;
    axios.get(queryUrl)
        .then((result) => {
            console.log(result.data);
            const {
                Title,
                Year,
                imdbRating,
                Country,
                Language,
                Plot,
                Actors
            } = result.data;
            if (!result.data.Ratings[1]) {
                tomatoRating = "N/A";
            } else {
                tomatoRating = result.data.Ratings[1].Value;
            }
            let movieInfo = `\r\n\
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
Rotten Tomatoes Rating:  ${tomatoRating}
\r\n`;
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

function mediaThis() {
    inquirer.prompt([{
            name: "command",
            type: "list",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "End Program"],
            message: "Please choose your action."
        },
        {
            name: "usrInput",
            type: "input",
            message: "Enter what to look for:"
        }
    ]).then(function (command) {

        switch (command.command) {
            case "concert-this":
                concert(command.usrInput);
                break;

            case "spotify-this-song":
                spotifyThis(command.usrInput);
                break;

            case "movie-this":
                movie(command.usrInput);
                break;

            case "do-what-it-says":
                doIt();
                break;

            case "End Program":
                return;
        }
        mediaThis();
    })
}
mediaThis();