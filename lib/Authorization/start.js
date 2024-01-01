const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const url = require('url');
const { sha256, base64encode, dboperatin, fetchcall } = require('./helper');
const { clientId, clientSecret, redirect_uri } = require('../Constants/config.js');
const { InsertData } = require('../Database/connection.js');
const { returnSCope } = require('./scope.js');
const { setVolume, PauseSong, PlaySong, NextSong, GetState, GetArtistData, TopTracks, GetSongDetails, ArtistAlbum, ArtistDetails, ArtistTopTracks, GetAvailableDevices, PreviousSong } = require('../Player/actions.js');
const cors = require('cors');
const { GenerateToken } = require('./generatetoken.js');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const nextfunction = (codeVerifier) => {
  const Challenge = async () => {
    let hashed = await sha256(codeVerifier)
    return base64encode(hashed)
  }
  Challenge()
    .then(result => {
      app.get('', (req, res) => {
        const state = Math.random().toString(36).substring(7);
        //const scope = 'user-read-private user-read-email';
        //const scope = 'user-read-playback-state user-modify-playback-state';
        //let scope = 'user-read-playback-state'
        //let scope = returnSCope('')
        let scope = returnSCope('getstate')

        const authUrl = new URL('https://accounts.spotify.com/authorize');

        app.set('codeVerifier', codeVerifier);

        const params = {
          response_type: 'code',
          client_id: clientId,
          scope,
          code_challenge_method: 'S256',
          code_challenge: result,
          redirect_uri: redirect_uri,
          state,
        };

        authUrl.search = new url.URLSearchParams(params).toString();
        const urlParts = url.parse(req.url, true);
        const queryParams = urlParts.query;

        if (queryParams.code && queryParams.state) {
          InsertData({ code: queryParams.code }, 'code').then((res) => { console.log(`code insertion done`) }).catch((er) => { console.log(`error ${er}`) })
          InsertData({ state: queryParams.state }, 'state').then((res) => { console.log(`state insertion done`) }).catch((er) => { console.log(`error ${er}`) })
        }
        res.redirect(authUrl.toString());
      });

      app.get('/callback', async (req, res) => {
        console.log('response getting')
        const { code } = req.query;
        const storedCodeVerifier = app.get('codeVerifier');

        const tokenEndpoint = 'https://accounts.spotify.com/api/token';
        const tokenParams = {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirect_uri,
          client_id: clientId,
          code_verifier: storedCodeVerifier,
        };

        try {
          const response = await axios.post(tokenEndpoint, null, {
            params: tokenParams,
            auth: {
              username: clientId,
              password: clientSecret,
            },
          });

          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          res.send('Authorization successful!');
        } catch (error) {
          console.error('Error exchanging code for token:', error.message);
          res.status(500).send('Internal Server Error');
        }
      });

      app.post('/artist', (req, res) => {
        res.send(GetArtistData(req.body.id));
      })
      app.get('/toptracks', (req, res) => {
        res.send(TopTracks(req.body.id, req.body.country));
      })
      app.post('/setvolume', (req, res) => {
        fetchcall('device_id', async (deviceid) => {
          let result = await setVolume(parseInt(req.body.setpoint), deviceid)
          console.log(result);
          res.status(200).send(result);
        })
      });

      app.put('/pause', (req, res) => {
        fetchcall('device_id', async (deviceid) => {
          let pausesong = await PauseSong(deviceid);
          res.status(200).send(pausesong);
        })
      })

      app.put('/play', (req, res) => {
        fetchcall('device_id', async (deviceid) => {
          let playsong = await PlaySong(deviceid);
          res.status(200).send(playsong);

        })
      })

      app.post('/next', (req, res) => {
        fetchcall('access_token', (token) => {
          fetchcall('device_id', async (deviceid) => {
            let nextsong = await NextSong(token, deviceid);
            res.status(200).send(nextsong);
          })
        })
      })

      app.post('/previous', (req, res) => {
        fetchcall('access_token', (token) => {
          fetchcall('device_id', async (deviceid) => {
            let previossong = await PreviousSong(token, deviceid);
            res.status(200).send(previossong);
          })
        })
      })

      app.get('/state', async(req, res) => {
        let state = await GetState();
        console.log(state.items)
        res.status(200).send(state);
      })

      app.get('/songdetails', (req, res) => {
        GetSongDetails(req.query).then((res1) => {
          console.log(JSON.stringify(res1));
          res.status(200).send(res1);
        }).catch((err) => {
          console.log(err)
          res.sendStatus(404)
        })
      })

      app.get('/artistalbum', (req, res) => {
        let artistalbum = ArtistAlbum(req.body.a_id)
        res.status(200).send(artistalbum);
      })

      app.get('/artistdetails', (req, res) => {
        let artistdetails = ArtistDetails();
        res.status(200).send(artistdetails)
      })

      app.get('/artisttoptracks', (req, res) => {
        let toptraks = ArtistTopTracks(req.body.a_id)
        res.status(200).send(toptraks)
      })
      app.get('/devices', (req, res) => {
        try {
          fetchcall('access_token', async (token) => {
            let devices = await GetAvailableDevices(token);
            console.log(`-----`)
            console.log(devices);
            res.status(200).send(devices);
          })
        } catch (error) {
          console.error(`Error getting devices: ${error}`);
          res.status(500).send('Internal Server Error');
        }
      });
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });

    })
    .catch(error => {
      console.error('Error in main:', error);
    });
}
dboperatin((flag) => {
  if (flag) {
    fetchcall('codeVerifier', (codeVerifier) => {
      nextfunction(codeVerifier)
      setTimeout(() => {
        GenerateToken(codeVerifier)
      }, 1000);
      scheduler.scheduleJob('0 * * * *', () => {
        console.log('this will run at every hour')
        GenerateToken(codeVerifier)
      })
    })
  }
})
