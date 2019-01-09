# Table of Contents <!-- omit in toc -->
- [LIRI](#liri)
- [Starting Out](#starting-out)
- [Contributing](#contributing)
- [Technology Used](#technology-used)
- [License](#license)
- [Notes](#notes)
- [Preview](#preview)
  
# LIRI
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


# Starting Out 
1. Clone repo
2. Go to folder in bash/terminal
3. npm install
4. See [notes](#notes) to run the app
5. Enjoy

# Contributing
1. Fork the repo
2. Create your branch for the feature you want
3. Commit your changes
4. Push to the branch
5. Submit a pull request
   
# Technology Used
1. Node.js
2. NPM [Inquirer](https://www.npmjs.com/package/inquirer)
3. NPM [Axios](https://www.npmjs.com/package/axios)
4. NPM [Moment](https://www.npmjs.com/package/moment)
5. NPM [Node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
6. [OMDB API](https://www.omdbapi.com/)
7. [BandsinTown API](https://manager.bandsintown.com/support/bandsintown-api)
   
# License
N/A

# Notes
LIRI will work four different ways depending on which command is used:
* `concert-this`
  1. Insert artist name to look for
  2. This command will show:
     1. Lineup if there are more people at concert
     2. Name of Venue
     3. City
     4. State
     5. Region
     6. Country
     7. Date
     8. If no artist was inputted then it will show the information for Blue October
* `spotify-this-song`
  1. Insert song to look for
  2. This command will show:
     1. Song Name
     2. Artist Name
     3. Album Name
     4. Link to song preview
     5. If no song was inputted then it will show the information for Ace of Base - The Sign
* `movie-this`
  1. Insert movie to look for
  2. This command will show:
     1. Title
     2. Year
     3. Country movie made in
     4. Language
     5. Plot
     6. Actors
     7. IMDB Rating
     8. Rotten Tomatoes Rating
     9. If no movie was inputted then it will show the information for Mr. Nobody
* `do-what-it-says`
  1. This command will read random.txt and use the command and input from there

# Preview
![](https://github.com/jhernandeztorres/BC-LIRI-Node-App/blob/master/LiriGif.gif)
