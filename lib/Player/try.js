const axios = require('axios')
const AxiosReq = async (config) => {
    try {
        console.log(`response of config ${JSON.stringify(config)}`)
        let action = config.url.split('/')[config.url.split('/').length - 1].trim();
        let response = await axios(config)
        if (response.data === '') {
            return `Set ${action} action performed successfully`;
        } else {
            return response.data;
        }
    } catch (error) {
        console.log(error)
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

let res = AxiosReq({ "method": "post", "url": "https://api.spotify.com/v1/me/player/next", "device_id": "35b07192d1d19336409f2e7104bc80cfabce3bcc", "headers": { "Authorization": "Bearer BQCgl9FQY5MM33c8ZJezLR3fwUiArDOqz4R_UPiww_BGPs3YYw87ebdqzNpRxwMPkkNITdQIZDH-A0h42qjqZyr2z8fvfJqA10wK7CyJFgqKbJXo0CmGWxpv2qOotxnoF5qQjrzmClcCdiRJj_IsVYzp9SGFnmz_gb9N3U0o4dWzlnCO1UhgeTnr8HDExxheWMQFNuF5bx2BaC8wl5S7zOBDsIARVIi7", "Content-Type": "application/json" } })
console.log(res);