const axios = require('axios');
const AxiosReq = (config) => {
    try {
        axios(config)
            .then((response) => {
                return response.data
            }).catch((error) => {
                console.log(error)
                console.error('Error:', error.response ? error.response.data : error.message);
            })
    } catch (error) {
        console.log(error)
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
module.exports = {
    AxiosReq
}