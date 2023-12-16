const axios = require('axios');
const { fetchcall } = require('../Constants/helper');

fetchcall('access_token', (token) => {
    console.log(`got the access token ${token}`)

    const queryParams = {
        q: 'naan gali',
        type: 'track',
        limit: 1,
        offset: 1,
        include_external: 'audio',
    };

    axios.get('https://api.spotify.com/v1/search', {
        params: queryParams,
        headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
        },
    })
        .then(response => {
            console.log('Response:', response.data.tracks.items[0].artists);
            //console.log('Response:', response.data.tracks.items[0].artists);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
});