const axios = require('axios');
const { fetchcall } = require('../Constants/helper');
const requestToEndPoint = (url,params) => {
    let promise = new Promise((resolve, reject) => {
        try {
            console.log('inside the function requestToEndPoint')
            fetchcall('access_token', (token) => {
                let config = {
                    method: 'get',
                    url: url,
                    params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                axios(config)
                    .then((res) => {
                        console.log(`got response from enpoint`);
                        resolve(res.data)
                    }).catch((error) => {
                        console.log(`got error from endpoint ${error}`);
                        console.error('Error:', error.response ? error.response.data : error.message);
                        reject(error)
                    })
            })
        } catch (error) {
            console.log(`getting error ${error}`)
            reject(error)
        }
    })
    return promise
}


module.exports = {
    requestToEndPoint
}


