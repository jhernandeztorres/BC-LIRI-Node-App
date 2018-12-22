require("dotenv").config();

const spotify = new Spotify(keys.spotify);

const [node, file, action, ...args] = procecss.argv;

