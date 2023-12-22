const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setVolume, PauseSong } = require('./setvolume');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/setvolume', (req, res) => {
    const speechResult = req.body.speechResult;
    console.log(`Received speech result from client: ${speechResult}`);
    setVolume(speechResult)
    res.status(200).send('Speech result received successfully');
});

app.put('/pause',(req,res)=>{
    res.send('your song is paused')
    PauseSong()
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
