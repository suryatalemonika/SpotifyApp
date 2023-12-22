const { requestToEndPoint } = require("../Authorization/fetchingapi");
const { spotify_uri } = require("../Constants/config");

const apiUrl = `${spotify_uri}me/player/devices`;
requestToEndPoint(apiUrl)
    .then((re) => {
        console.log(`this is a response from requestToEndPoint `);
        if(re.hasOwnProperty('devices')){
            console.log('yyyyyyyyyy')
            console.log(re['devices'])
            if(re.devices.length>0){
                re.devices.forEach(spotifyDevice => {
                    console.log(`having devices with name ${spotifyDevice.name}`)
                    //spotify:artist:5GnnSrwNCGyfAU4zuIytiS
                    //'11243b4c14f62080560ad35e7da557e959cea1ca' //computer
                });
            }

        }
        
    }).catch((e) => {
        console.error('Error:', e)//.response ? error.response.data : error.message);
    })
