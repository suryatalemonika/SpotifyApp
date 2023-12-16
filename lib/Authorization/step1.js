const axios = require('axios');
const { fetchcall } = require('../Constants/helper');
let token = fetchcall('access_token', (token) => { console.log(`got the access token ${token}`) })
let topTracksIds = []
const fetchWebApi = async (endpoint, method, data) => {
    try {
        const response = await axios({
            url: `https://api.spotify.com/${endpoint}`,
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getTopTracks = async () => {
    const endpoint = 'v1/me/top/tracks?time_range=long_term&limit=5';
    return (await fetchWebApi(endpoint, 'GET')).items;
}

const main = async () => {
    try {
        const topTracks = await getTopTracks();
        topTracks?.map(
            ({ name, artists, id }) => {
                topTracksIds.push(id)
                console.log(`${name} by ${artists.map((artist) => artist.name).join(', ')}`)
            })
        return topTracksIds
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

const topTracksIdss = async () => {
    try {
        const response = await getTopTracks();
        return response?.map(({ id }) => id);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};
module.exports = {
    fetchWebApi,
    main,
    topTracksIdss,
    
}
