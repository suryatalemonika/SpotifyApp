const axios = require('axios');
const { spotify_uri } = require('../Constants/config');
let a_id = ''
let enpoint = '';
const requestToEndPoint = ()=>{
    try {
        console.log('inside the function requestToEndPoint')
    } catch (error) {
       console.log(`getting error ${error}`) 
    }
}
const url = `${spotify_uri}/artists/${a_id}/albums`;


requestToEndPoint('/V1/aritists/${id}/album')