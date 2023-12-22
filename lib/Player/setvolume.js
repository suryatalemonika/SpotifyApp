exports.setVolume = (speechResult) => {
  const { spotify_uri } = require("../Constants/config");
  const { fetchcall } = require("../Constants/helper");
  const { AxiosReq } = require("./api");
  fetchcall('access_token', (token) => {
      const url = `${spotify_uri}me/player/volume`;
      const config = {
          method: 'put',
          url: url,
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // Specify JSON content type
          },
          params: {
              volume_percent: speechResult,
          }
      };
      console.log(AxiosReq(config))
  })
}


exports.PauseSong = () => {
  const { spotify_uri } = require("../Constants/config");
  const { fetchcall } = require("../Constants/helper");
  const { AxiosReq } = require("./api");
  fetchcall('access_token', (token) => {
      const url = `${spotify_uri}me/player/pause`;//me/player/pause
      const config = {
          method: 'put',
          url: url,
          device_id:'57d025198ef75045dcd1c12221e44d50aeb7361a',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // Specify JSON content type
          }
      };
      console.log(AxiosReq(config))
  })
}
