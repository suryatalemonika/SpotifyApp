const axios = require('axios');
const { clientId, clientSecret, redirect_uri } = require('./config');
const { fetchcall } = require('./helper');
const { InsertData } = require('../Database/connection.js');
const { getRefreshToken } = require('../Authorization/refreshtoken.js');

const againfunct = (codeVerifier) => {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const getToken = async (code) => {
    const payload = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri,
      code_verifier: codeVerifier,
    });
    try {
      const response = await axios.post(tokenEndpoint, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      InsertData({ access_token: response.data.access_token }, 'access_token').then((res) => {console.log(`access_token insertion done`)}).catch((er) => { console.log(`error ${er}`) })
      console.log('New Refresh Token:', response.data.refresh_token);
      InsertData({ refresh_token: response.data.refresh_token }, 'refresh_token').then((res) => {console.log(`refresh_token insertion done`)}).catch((er) => { console.log(`error ${er}`) })
      console.log('Access Token:', response.data.access_token);
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: errorCode, error_description: errorDescription } = error.response.data;
        console.log(`Error Code: ${errorCode}`);
        console.log(`Error Description: ${errorDescription}`);
        console.log(`ACCESS TOKEN GENERATION LIMIT EXEDED PLESE GENERATE NEW CODE`);
        getRefreshToken()
    } else {
        console.error('Error:', error.message);
    }
    }
  };
  fetchcall('code',(code) => {
    //console.log(`got the code in help function ${code}`)
    getToken(code);
  })
}
fetchcall('codeVerifier',(codeVerifier) => {
  //console.log(`got the coeeverifier in help function ${codeVerifier}`)
  againfunct(codeVerifier)
})
