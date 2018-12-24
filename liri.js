require("dotenv").config();
const inquirer = require("inquirer");
const keys = require('./keys');
const fs = require("fs");
const axios = require("axios");
const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

function concert(input) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js concert-this ' + input, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Function still being built. Come back some other time to try it out.");
    })
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

            let songInfo = data.tracks.items[0];
            if (!songInfo) {
                console.log("No song info retrieved. Check the song spelling and try again.");
            } else {
                let outputStr = '\r\n' +
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

function movie(input) {
    fs.appendFile('log.txt', '\n' + 'Command Entered was: node liri.js movie-this ' + input, function (err) {
        if (err) {
            console.log(err);
        }
    })
    if (!input) {
        input = 'Mr Nobody';
    }
    let queryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=' + keys.omdb.apiKey;
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
    ]).then(function(command){
        
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
    
            case "End program":
                return;
            }
    })
}
mediaThis();