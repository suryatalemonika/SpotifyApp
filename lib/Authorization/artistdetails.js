

const axios = require('axios');
const { fetchcall } = require('../Constants/helper');

fetchcall('access_token', (token) => {
    console.log(`got the access token ${token}`)

    axios.get('https://api.spotify.com/v1/artists/3TUNkjIHkcvEy9oeK2D4hU', {
        headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
        },
    })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
});