const { spotify_uri } = require("../Constants/config");
const { fetchcall } = require("../Constants/helper");
const { AxiosReq } = require("./api");

fetchcall('access_token', (token) => {
    const url = `${spotify_uri}me/player`;
    const config = {
        method: 'put', // write method name in lower case
        url: url,
        params: {},
        data: {
            "device_ids": [
        '35b07192d1d19336409f2e7104bc80cfabce3bcc'
    ]
        }, // Include your data here
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    AxiosReq(config)
})