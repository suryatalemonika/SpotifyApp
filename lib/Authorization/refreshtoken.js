const axios = require('axios');
const { clientId } = require('../Constants/config');
const { InsertData } = require('../Database/connection');
const { fetchcall } = require('../Constants/helper');

const getRefreshToken = () => {
    const url = 'https://accounts.spotify.com/api/token';
    fetchcall('refresh_token', async (refresh_token) => {
        const payload = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: clientId,
        });

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Assuming the response contains accessToken and refreshToken properties
            InsertData({ access_token: response.data.access_token }, 'access_token').then((res) => { console.log(`access_token insertion done`) }).catch((er) => { console.log(`error ${er}`) })
            console.log('New Refresh Token:', response.data.refresh_token);
            InsertData({ refresh_token: response.data.refresh_token }, 'refresh_token').then((res) => { console.log(`refresh_token insertion done`) }).catch((er) => { console.log(`error ${er}`) })
        } catch (error) {
            // Handle error
            console.error('Error:', error.response ? error.response.data : error.message);
            console.error('Error refreshing token:', error.message);
        }
    })
};

// Example usage

module.exports = {
    getRefreshToken
}