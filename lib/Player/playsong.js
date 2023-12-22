const axios = require('axios');
const { fetchcall } = require('../Constants/helper');

const url = 'https://api.spotify.com/v1/me/player/play';
fetchcall('access_token', (token) => {
    const params = {
        // Include your query parameters here
    };

    const data = {
        context_uri: 'spotify:album:4Q5dbM6TBcyzO05kUx2jJ3',
        offset: {
            position: 5
        },
        position_ms: 0,
        device_id: '11243b4c14f62080560ad35e7da557e959cea1ca' // Replace with the actual device_id//
        //11243b4c14f62080560ad35e7da557e959cea1ca --computer
        //35b07192d1d19336409f2e7104bc80cfabce3bcc --smartphone
    };

    const config = {
        method: 'put', // Change the method to 'put' for a PUT request
        url: url,
        params: params,
        data: data, // Include your data here
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    axios(config)
        .then(response => {
            // Handle the successful response here
            console.log(response.data);
        })
        .catch(error => {
            // Handle errors here
            console.error(error);
            console.error('Error:', error.response ? error.response.data : error.message);
        });
})