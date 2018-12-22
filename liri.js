require("dotenv").config();
const keys = require('./keys');
const fs = require("fs");

const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");

const spotify = new Spotify(keys.spotify);
// const omdb = new OMDB(keys.omdb);

const [node, file, action, ...args] = process.argv;
let joined = args.join("+");

switch (action) {
    case null:
        blank();
        break;

    case undefined:
        blank();
        break;

    case "":
        blank();
        break;

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
}

function blank() {
    console.log("You must supply an action to do. \n concert-this \n spotify-this-song \n movie-this \n do-what-it-says")
}

function concert() {

}

function spotifyThis(song) {
    fs.appendFile('random.txt', 'Command Entered was: node liri.js spotify-this-song ' + song, function(err){
        if(err){
            console.log(err);
        }
    })
    
    let search;
    if(!song){
       search = 'The Sign Ace of Base';
   } else {
       search = song;
   } 
   
   spotify.search({ type: 'track', query: search}, function(err, data){
    if(err){
        console.log(err);
    } else {
        
        let songInfo = data.tracks.items[0];
        if(!songInfo){
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

function movie() {
    //omdb app info
}

function doIt() {
    fs.readFile("random.txt", "UTF8", function(err, data){
        if(err){
            return console.log(err);
        } else {
            let txtString = data.split(',');
            let txtAction = txtString[0].trim();
            let txtInput = txtString[1].trim();

            switch(txtAction){
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

function axiosGet(url) {
    axios.get(url).then(function (err, res) {
        if (err) {
            console.log(err);
        }

    })
}