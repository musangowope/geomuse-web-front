const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios  =  require('axios');
const cors = require('cors');

require('dotenv').config()

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/explore", async (req, res, next) => {
    try {
        const fuzzytags = req.query.genres;
        const namesearch = req.query.q;

        const tracksRequestUrl = new URL('https://api.jamendo.com/v3.0/tracks');
        tracksRequestUrl.searchParams.set('client_id', process.env.JAMENDO_CLIENT_ID);
        const paramsLibrary = {
            ...fuzzytags ? { fuzzytags } : {},
            ...namesearch ? { namesearch } : {}
        }

        if(Object.keys(paramsLibrary).length) {
            Object.keys(paramsLibrary).forEach(filterKey => {
                tracksRequestUrl.searchParams.set(filterKey, paramsLibrary[filterKey])
            });
            const { data = []  } = await axios.get(tracksRequestUrl.href);

            const tracks = data.results.map(track  => ({
                image: track.image,
                uri: track.audio,
                name: track.name,
                artist: track.artist_name,
                id: track.id
            }))

            res.json(tracks);
        } else {
            res.json([])
        }
    } catch (e) {
        res.json(e.message || 'Internal server error');
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
