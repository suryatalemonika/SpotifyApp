const axios = require('axios');
const Get = (accessToken, id) => {
    try {
        console.log('inside get function')
        console.log(id);
        let url = `https://api.spotify.com/v1/artists/${id}`
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        axios(config).then((res) => {
            console.log(res.data);
            return res.data
        }).catch((e) => {
            console.log(`error response ${e}`);
        })
    } catch (error) {
        console.log(`inside getReq ${error}`)
    }
}

const TopTracks = (token,id,country)=>{
    let url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`
    console.log(url);
    const config = {
        method: 'get',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    axios(config).then((res) => {
        console.log(res.data);
        return res.data
    }).catch((e) => {
        console.log(`error response ${e}`);
    })
}
// Axios request configuration

module.exports = {
    Get,
    TopTracks
}
