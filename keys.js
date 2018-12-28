console.log("This is loaded!");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}

exports.omdb = {
    apiKey: process.env.OMDB_KEY
}

exports.band = {
    apiKey: process.env.BandsinTown_KEY
}