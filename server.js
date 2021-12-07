const express = require('express');
const app = express();
const path = require('path');

const router = require('./scripts/router.js');
// paintings routing
router.handleAllPaintings(app);
router.handlePaintingId(app);
router.handleGalleryPaintings(app);
router.handleArtistPaintings(app);
router.handleDateRange(app);
router.handleTitleSearch(app);
router.handlePaintingColors(app);
// artists routing
router.handleAllArtists(app);
router.handleCountrysArtists(app);
// galleries routing
router.handleAllGalleries(app);
router.handleCountryGalleries(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on *${port}`);
});