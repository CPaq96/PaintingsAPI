const data = require('./data-provider.js');

// ----- Paintings Routing -----
// Returns JSON of all paintings
const handleAllPaintings = app => {
    app.get('/paintings', (req, resp) => { resp.json(data.paintings) });
}

// Returns JSON of the painting with a given id
const handlePaintingId = app => {
    app.get('/painting/:id', (req, resp) => {
        const match = data.paintings.filter(p => p.paintingID == req.params.id);
        if (match.length > 0) // If painting was found, return JSON of painting
            resp.json(match);
        else // else return error message
            resp.json({"message": `no painting with id ${req.params.id}`});
    });
}

// Returns JSON of all paintings whose gallery id that matches the given gallery id
const handleGalleryPaintings = app => {
    app.get('/painting/gallery/:id', (req, resp) => {
        const matches = data.paintings.filter(p => p.gallery.galleryID == req.params.id);
        if (matches.length > 0) // If paintings were found, return JSON of paintings
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no paintings from gallery ${req.params.id}`});
    });
}

// Returns JSON of all paintings whose artist id matches the given artist id
const handleArtistPaintings = app => {
    app.get('/painting/artist/:id', (req, resp) => {
        const matches = data.paintings.filter(p => p.artist.artistID == req.params.id);
        if (matches.length > 0) // If paintings were found, return JSON of paintings
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no paintings from artist ${req.params.id}`});
    });
}

// Returns JSON of all paintings whos yearOfWork is between the two supplied values(inclusive)
const handleDateRange = app => {
    app.get('/painting/year/:min/:max', (req, resp) => {
        const matches = data.paintings.filter(p => 
            p.yearOfWork >= req.params.min && p.yearOfWork <= req.params.max
        );
        if (matches.length > 0) // If paintings were found, return JSON of paintings
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no paintings from ${req.params.min} to ${req.params.max}` });
    });
}

// Returns JSON of all paintings whose title contains the provided text
const handleTitleSearch = app => {
    app.get('/painting/title/:text', (req, resp) => {
        const regEx = new RegExp(req.params.text, 'i'); // case insensitive RegExp of text
        const matches = data.paintings.filter(p => p.title.match(regEx));
        if (matches.length > 0) // If paintings were found, return JSON of paintings
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no painting titles contain \'${req.params.text}\'`});
    });
}

// Returns JSON of all paintings whose dominantColors contain the color name value provided
const handlePaintingColors = app => {
    app.get('/painting/color/:name', (req, resp) => {
        const color = req.params.name.replace("+", " "); // restore spaces
        const regEx = new RegExp(color, 'i'); // case insensitive RegExp of color name
        const matches = [];
        data.paintings.forEach(p => {
            for (c of p.details.annotation.dominantColors) {
                if (c.name.match(regEx)) {
                    matches.push(p);
                    break;
                }
            }
        });
        if (matches.length > 0) // If paintings were found, return JSON of paintings
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no painting contains the color ${req.params.name}`});
    });
}

// ----- Artists Routing -----
// Returns JSON of all artists
const handleAllArtists = app => {
    app.get('/artists', (req, resp) => { resp.json(data.artists) });
}

// Returns JSON of all artists whose Nationality matches the provided country
const handleCountrysArtists = app => {
    app.get('/artist/:country', (req, resp) => {
        const regEx = new RegExp(req.params.country, 'i'); // case insensitive RegExp of country
        const matches = data.artists.filter(a => a.Nationality.match(regEx));
        if (matches.length > 0) // If artists were found, return JSON of artists matched
            resp.json(matches);
        else // else return error message
            resp.json({"message": `no artists are from ${req.params.country}`});
    });
}

// ----- Galleries Routing -----
// Returns JSON of all galleries
const handleAllGalleries = app => {
    app.get('/galleries', (req, resp) => { resp.json(data.galleries) });
}

// Returns JSON of all galleries whose GalleryCountry matches the provided country
const handleCountryGalleries = app => {
    app.get('/galleries/:country', (req, resp) => {
        const regEx = new RegExp(req.params.country, 'i'); // case insensitive RegExp of country
        const matches = data.galleries.filter(g => g.GalleryCountry.match(regEx));
        if (matches.length > 0) // If galleries were found, return JSON of galleries matched
            resp.json(matches);
        else // else return error message
            resp.json({"message": `there are no galleries in ${req.params.country}`});
    })
}



module.exports = {
    handleAllPaintings, 
    handlePaintingId,
    handleGalleryPaintings,
    handleArtistPaintings,
    handleDateRange,
    handleTitleSearch,
    handlePaintingColors,
    handleAllArtists,
    handleCountrysArtists,
    handleAllGalleries,
    handleCountryGalleries
};