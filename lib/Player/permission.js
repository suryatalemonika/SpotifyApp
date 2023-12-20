const axios = require('axios');
const { fetchcall } = require('../Constants/helper');

const apiUrl = 'https://api.spotify.com/v1/me/player/devices';
fetchcall('access_token', (token) => {

    const accessToken = '1POdFZRZbvb...qqillRxMr2z';

    // Make sure this token has the necessary scopes for the Spotify API endpoint you are accessing
    const requiredScopes = 'user-read-playback-state user-modify-playback-state';

    axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            // Handle the successful response here
            console.log(response.data);
        })
        .catch(error => {
            if (error.response) {
                // The request was made, but the server responded with a status code outside of 2xx
                console.error('Error status:', error.response.status);
                console.error('Error message:', error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
            }
        });

})