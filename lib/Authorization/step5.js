const axios = require('axios');

// Authorization token that must have been created previously. See: https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQB4-QiFFoDUBFqiFQsi53VeQ5cjSt-4K1yGAnNLlsuueyxeP4xSSzWbCuFi1DRvapkigDEbpfvIMSiGaDrMEc2QCWVDdfLvGL3PovLYc4p2awWm_KzOs_-DUYFFMVcN6xhS1zQdhuPtDkqnNxI2xPWX3CDAA1um9mUs9nkTaBwRRQAL4meBW6kM9SIfQUlriDF9hJHV6M5rvnnK8PtPGqZiZB-XD7TIRtY1f-hXo51VlQcMsHI_HMWWakn6G5rFOw0nybRRAhS885enyc2y5toD';

async function fetchWebApi(endpoint, method, body) {
  const url = `https://api.spotify.com/${endpoint}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

const tracksUri = [
  'spotify:track:7gXkeV2BHU3eLOMtsWs6nz', 'spotify:track:3AVHfwhZM2QdzyYjVEPEjt', 'spotify:track:65zT93vcXbMxbs05YYP8dg', 'spotify:track:2MwCoo4GeXpi8soWn9EiPo', 'spotify:track:0S5w2XaiBmIDIUP0qpz7ix', 'spotify:track:4VL0qziEuvFomcb6I6XxTO', 'spotify:track:11o3VK2FC9YziCepCCeeVK', 'spotify:track:78z7DG3Z8vZ57G3c0AzI9P', 'spotify:track:1mPf6QFVWQmk0MiSbIy2Am', 'spotify:track:3unti8bdiV2N4wzFTtR4EF'
];

async function createPlaylist(tracksUri) {
  try {
    const { id: user_id } = await fetchWebApi('v1/me', 'GET');
    //console.log(` user_id : ${user_id}`)
    const playlist = await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'POST', {
      name: 'My recommendation playlist',
      description: 'Playlist created by the tutorial on developer.spotify.com',
      public: false,
    }
    );
    console.log(`api : v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`)
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
    console.log(playlist)
    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
}

(async () => {
  try {
    const createdPlaylist = await createPlaylist(tracksUri);
    console.log('=========================================================')
    console.log(createdPlaylist)

    console.log(createdPlaylist.name, createdPlaylist.id);
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
})();
