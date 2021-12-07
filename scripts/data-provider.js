const path = require('path');
const fs = require('fs');

const jsonPaintingsPath = path.join(__dirname, '../data/paintings-nested.json');
const jsonPaintingsData = fs.readFileSync(jsonPaintingsPath, 'utf8');
const paintings = JSON.parse(jsonPaintingsData);

const jsonArtistsPath = path.join(__dirname, '../data/artists.json');
const jsonArtistsData = fs.readFileSync(jsonArtistsPath, 'utf8');
const artists = JSON.parse(jsonArtistsData);

const jsonGalleriesPath = path.join(__dirname, '../data/galleries.json');
const jsonGalleriesData = fs.readFileSync(jsonGalleriesPath, 'utf8');
const galleries = JSON.parse(jsonGalleriesData);

module.exports = {paintings, artists, galleries};