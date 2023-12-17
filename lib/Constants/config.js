const token = 'BQAF7qUuS_SmZIFhGuJF33D7gCgZ-jTg1uWrg318wgp9MFRsXp4N7nhlVqSV6_fLfhop1C3k7f-ZV9zmHp1-LEeCY5bE720FfSH1GjyjZB44X8stbaq4WQQZvlHDIm6334mU7SItEVlFFumDK-l_4bJtM6p5BpxbVysB0i--5Xovyx5HuJAZeMHdPR_LbmEH8iEQHNSrVd0JpqXYudn2BIALfGNadlWlJwZghvchIM_eO6yWRQwHdRsgyh-WwGG_cSyRLlWvaATGn2X81-UfK4vM';
const clientId = '69821687e8754eb987ca2274fa0bf577';
const clientSecret = '4e43ee38192f43d78a5356e09b3bd40b'
const scope = 'user-read-private user-read-email';
let spotify_uri = 'https://api.spotify.com/v1/'
const redirect_uri = 'http://localhost:8080'
module.exports = {
    token,
    clientId,
    clientSecret,
    scope,
    redirect_uri,
    spotify_uri
}