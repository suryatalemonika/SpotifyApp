const { fetchWebApi, topTracksIdss } = require('../Authorization/step1'); // Adjust the path as needed
const useTopTracksIds = async () => {
    try {
        return await topTracksIdss();
    } catch (error) {
        console.error('An error occurred while fetching top track IDs:', error.message);
        throw error; 
    }
};

const getRecommendations = async (topTracksIds) => {
    const endpoint = `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`;
    let result = await fetchWebApi(endpoint, 'GET')
    return result.tracks
};

const main = async (topTracksIds) => {
    try {
        const response = await getRecommendations(topTracksIds)
        if (response && response.length > 0) {
            return response?.map(({ uri }) => uri);
        } else {
            console.log('No recommended tracks found.');
        }
    } catch (error) {
        console.error('An error occurred in main:', error.message);
    }
};
const gettingUris = async ()=>{
    let resultArray= await useTopTracksIds()
    let top5recomandedsongs = await main(resultArray);
    console.log(`My recommendation songs`)
    console.log(top5recomandedsongs)
    return top5recomandedsongs
}


module.exports = {
    gettingUris
}