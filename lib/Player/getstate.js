const axios = require('axios');
const { fetchcall } = require('../Constants/helper');
let url = 'https://api.spotify.com/v1/me/player'

fetchcall('access_token', (token) => {
    const config = {
        method: 'get', // Change the method to 'put' for a PUT request
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    axios(config)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
            console.error('Error:', error.response ? error.response.data : error.message);
        });
})