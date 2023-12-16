const axios = require('axios');
const { token } = require('./Constants/config');
const promt = require('prompt-sync')();
let password = '0TnOYISbd1XYRBk9myaseg'//promt('enter your password : ');
// The URL should match your server's endpoint
const url = 'https://api.spotify.com/v1/me/player/play';
const handleLogin = (token, id) => {
    let data = {
        "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
        "offset": {
            "position": 5
        },
        "position_ms": 0
    }
    const config = {
        method: 'put',
        url: url,
        device_id:'',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data
    };
    axios(config)
        .then(response => {
            console.log('Response from server:', response.data);
        })
        .catch(error => {

            console.error('Error making POST request:', error);
        });
}
handleLogin(token);