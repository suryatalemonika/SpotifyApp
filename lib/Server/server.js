const express = require('express');
const bodyParser = require('body-parser');
const { setVolume, PauseSong, PlaySong, NextSong, GetState, GetArtistData, TopTracks, GetSongDetails, ArtistAlbum, ArtistDetails,ArtistTopTracks,GetAvailableDevices } = require('../Player/actions');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.get('', (req, res) => {
    res.send('server is running successfully');
})

app.post('/artist', (req, res) => {
    res.send(GetArtistData(req.body.id));
})
app.get('/toptracks', (req, res) => {
    res.send(TopTracks(req.body.id, req.body.country));
})
app.post('/setvolume', (req, res) => {
    let result = setVolume(parseInt(req.body.setpoint))
    console.log(result)
    res.status(200).send(`${req.body.setpoint} volume set successfully`);
});

app.put('/pause', (req, res) => {
    res.status(200).send(`your song is paused successfully`);
    let pausesong = PauseSong();
    console.log(pausesong)
})

app.put('/play', (req, res) => {
    res.status(200).send(`your song playing successfully`);
    let playsong = PlaySong();
    console.log(playsong)
})

app.post('/next', (req, res) => {
    res.status(200).send(`your next song is playing successfully`);
    let nextsong = NextSong();
    console.log(nextsong)
})

app.post('/previous', (req, res) => {
    res.status(200).send(`your previous song is playing successfully`);
    let nextsong = NextSong();
    console.log(nextsong)
})

app.get('/state', (req, res) => {
    res.status(200).send(`success`);
    GetState();
})

app.get('/songdetails', (req, res) => {
    let details = GetSongDetails(req.body.songname)
    res.status(200).send(details);
})

app.get('/artistalbum', (req, res) => {
    let artistalbum = ArtistAlbum(req.body.a_id)
    res.status(200).send(artistalbum);
})

app.get('/artistdetails', (req, res) => {
    let artistdetails = ArtistDetails();
    res.status(200).send(artistdetails)
})

app.get('/artisttoptracks',(req,res)=>{
    let toptraks = ArtistTopTracks(req.body.a_id)
    res.status(200).send(toptraks)
})
app.get('/devices',(req,res)=>{
    let devices = GetAvailableDevices()
    console.log(devices)
    res.status(200).send(devices)
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
