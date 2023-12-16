const {gettingUris } = require('./step2');
const {fetchWebApi}  = require('./step1')

const createPlaylist = async (tracksUri) => {
  try {
    const { id: user_id } = await fetchWebApi('v1/me', 'GET');
    const playlist = await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'POST', {
      name: 'My recommendation playlist',
      description: 'Playlist created by the tutorial on developer.spotify.com',
      public: false,
    }
    );
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
}

(async () => {
  try {
    let dynamicuris = await gettingUris()
    const createdPlaylist = await createPlaylist(dynamicuris);
    console.log(createdPlaylist.name +' id ')
    console.log(createdPlaylist.id);
  } catch (error) {
    console.error(error.data);
  }
})();
