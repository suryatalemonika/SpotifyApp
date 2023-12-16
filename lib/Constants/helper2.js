const express = require('express');
const axios = require('axios');
const url = require('url');
const { sha256, base64encode,dboperatin ,fetchcall} = require('./helper');
const { clientId, clientSecret, redirect_uri } = require('./config');
const { InsertData } = require('../Database/connection.js')

const nextfunction = (codeVerifier) => {
  const Challenge = async () => {
    let hashed = await sha256(codeVerifier)
    return base64encode(hashed)
  }
  Challenge()
    .then(result => {
      console.log('code challange :', result);
      const app = express();
      const port = 8080;
      app.get('/', (req, res) => {
        const state = Math.random().toString(36).substring(7);
        const scope = 'user-read-private user-read-email';

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
          InsertData({ code: queryParams.code }, 'code').then((res) => {}).catch((er) => { console.log(`error ${er}`) })
          InsertData({ state: queryParams.state }, 'state').then((res) => {}).catch((er) => { console.log(`error ${er}`) })
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

          // Use the access token as needed
          // ...

          res.send('Authorization successful!');
        } catch (error) {
          console.error('Error exchanging code for token:', error.message);
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
    console.log(`got callback from dboperation ---------${JSON.stringify(flag)}`)
    if (flag) {
      fetchcall('codeVerifier',(codeVerifier) => {
        console.log(`got the code verifier =========${codeVerifier}=====================`)
        nextfunction(codeVerifier)
      })
    }
  })
