const clientId = '69821687e8754eb987ca2274fa0bf577';
const clientSecret = '4e43ee38192f43d78a5356e09b3bd40b'
const scope = 'user-read-private user-read-email';
let base_url = 'https://api.spotify.com/v1/'
const redirect_uri = 'http://localhost:8080'
module.exports = {
    clientId,
    clientSecret,
    scope,
    redirect_uri,
    base_url:spotify_uri
}