const axios = require('axios');
const AxiosReq = (config) => {
    try {
        console.log(`response of config ${JSON.stringify(config)}`)
        let action = config.url.split('/')[config.url.split('/').length - 1].trim();
        return axios(config)
            .then((response) => {
                if (response.data === '') {
                    return `set ${action} action performed successfully`;
                } else {
                    return response.data;
                }
            }).catch((error) => {
                console.log(error)
                console.error('Error:', error.response ? error.response.data : error.message);
                return error;
            });
    } catch (error) {
        console.log(error)
        console.error('Error:', error.response ? error.response.data : error.message);
        return error;
    }
}
module.exports = {
    AxiosReq
}