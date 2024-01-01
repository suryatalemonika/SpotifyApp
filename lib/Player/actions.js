const axios = require('axios');
const { spotify_uri } = require("../Constants/config");
const { fetchcall } = require("../Authorization/helper");
const { InsertData } = require("../Database/connection");

const AxiosReq = (config) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            console.log(`response of config ${JSON.stringify(config)}`)
            let action = config.url.split('/')[config.url.split('/').length - 1].trim();
            if (!config.hasOwnProperty('headers')) {
                fetchcall('access_token', async (token) => {
                    config.headers = {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                    let response = await axios(config)
                    if (response.data === '') {
                        let datares = {
                            message: `Set ${action} action performed successfully`
                        }
                        resolve(datares);
                    } else {
                        resolve(response.data);
                    }
                })
            } else {
                let response = await axios(config)
                if (response.data === '') {
                    let datares = {
                        message: `Set ${action} action performed successfully`
                    }
                    resolve(datares);
                } else {
                    resolve(response.data);
                }
            }
        } catch (error) {
            console.log(error)
            console.error('Error:', error.response ? error.response.data : error.message);
            reject(error)
            throw error;
        }
    })
    return promise
}

exports.GetAvailableDevices = async (token) => {
    try {
        const config = {
            method: 'get',
            url: `${spotify_uri}me/player/devices`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        const response = await AxiosReq(config);

        if (response.devices.length > 0) {
            for (const spotifyDevice of response.devices) {
                await InsertData({ device_id: spotifyDevice.id }, 'device_id');
                console.log(`device_id insertion done`);
            }
            return response;
        } else {
            console.log('no devices found');
            return { devices: [] };
        }
    } catch (error) {
        console.error(`${new Date().toJSON()} - got an error while getting devices  ${error}`);
        throw error;  // Propagate the error to the calling function
    }
};
exports.setVolume = async (speechResult, deviceid) => {
    try {

        const url = `${spotify_uri}me/player/volume`;
        const config = {
            method: 'put',
            url: url,
            device_id: deviceid,
            params: {
                volume_percent: speechResult,
            }
        };
        let response = await AxiosReq(config)
        return response
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while setting volume  ${error}`)
    }
}

exports.PauseSong = async (deviceid) => {
    try {
        const url = `${spotify_uri}me/player/pause`;
        const config = {
            method: 'put',
            url: url,
            device_id: deviceid
        };
        let respone = await AxiosReq(config)
        return respone;
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while pausing song ${error}`)
    }
}

exports.PlaySong = async (deviceid) => {
    try {
        const url = `${spotify_uri}me/player/play`;
        const config = {
            method: 'put',
            url: url,
            device_id: deviceid
        };
        let respone = await AxiosReq(config)
        return respone;
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing song ${error}`)
    }
}

exports.getTopTracksIds = () => {
    try {
        let topTracksIds = [];
        return fetchcall('access_token', (token) => {
            let url = `${spotify_uri}/me/top/tracks?time_range=long_term&limit=5`
            const config = {
                method: 'put',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            return AxiosReq(config).then(result1 => {
                topTracksIds = result1.items?.map(({ id }) => id);
                console.log(topTracksIds)
                return topTracksIds
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing song ${error}`)
    }
}

exports.NextSong = async (token, deviceid) => {
    try {
        let url = `${spotify_uri}me/player/next`
        const config = {
            method: 'post',
            url: url,
            device_id: deviceid,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let response = await AxiosReq(config)
        return response
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing next song ${error}`)
    }
}

exports.PreviousSong = async (token, deviceid) => {
    try {
        let url = `${spotify_uri}me/player/previous`
        const config = {
            method: 'post',
            url: url,
            device_id: deviceid,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let response = await AxiosReq(config)
        return response;
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing previous song ${error}`)
    }
}

exports.GetState = async () => {
    try {
        const url = `${spotify_uri}me/player`;
        const config = {
            method: 'get',
            url: url,
            market: 'ES'
        };
        let respone = await AxiosReq(config)
        return respone
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while setting volume  ${error}`)
    }
}

exports.GetArtistData = (id) => {
    try {
        console.log('inside get function')
        fetchcall('access_token', (token) => {
            let url = `${spotify_uri}artists/${id}`
            const config = {
                method: 'get',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            AxiosReq(config).then((res) => {
                return res
            }).catch((e) => {
                console.log(`error response ${e}`);
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting alrtist data  ${error}`)
    }
}

exports.TopTracks = (id, country) => {
    fetchcall('access_token', (token) => {
        let url = `${spotify_uri}artists/${id}/top-tracks?market=${country}`
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        AxiosReq(config).then((res) => {
            return res
        }).catch((e) => {
            console.log(`error response ${e}`);
        })
    })
}


exports.GetSongDetails = async (params) => {
    try {
        let tracks = 'SSSSSS';
        // Assuming fetchcall returns a Promise
        const token = await new Promise((resolve, reject) => {
            fetchcall('access_token', (token) => {
                if (token) {
                    resolve(token);
                } else {
                    reject(new Error('Failed to obtain access token'));
                }
            });
        });
        const config = {
            method: 'get',
            url: `${spotify_uri}search`,
            params: {
                q: params.songName,
                type: params.type,
                limit: 1,
                offset: 1,
                include_external: 'audio',
            },
            market: params.market,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // Assuming AxiosReq returns a Promise
        const res = await AxiosReq(config);

        tracks = res.tracks; // Assuming the response contains data property

        return tracks;
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting song details: ${error}`);
        throw error; // Rethrow the error to be handled elsewhere if needed
    }
};

exports.ArtistAlbum = (a_id) => {
    try {
        fetchcall('access_token', (token) => {
            let config = {
                method: 'get',
                url: `${spotify_uri}artists/${a_id}/albums`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            AxiosReq(config).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting artist album  ${error}`)
    }
}

exports.ArtistDetails = (a_id) => {
    try {
        fetchcall('access_token', (token) => {
            let config = {
                method: 'get',
                url: `${spotify_uri}artists/${a_id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            AxiosReq(config).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting artist details  ${error}`)
    }
}

exports.ArtistRelated = (a_id) => {
    try {
        fetchcall('access_token', (token) => {
            let config = {
                method: 'get',
                url: `${spotify_uri}artists/${a_id}/related-artists`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            AxiosReq(config).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting artist related data  ${error}`)
    }
}

exports.ArtistTopTracks = (a_id) => {
    try {
        fetchcall('access_token', (token) => {
            let config = {
                method: 'get',
                url: `${spotify_uri}artists/${a_id}/top-tracks`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                market: 'UA'
            }
            AxiosReq(config).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting artist top tracks ${error}`)
    }
}
/* exports.getrecomdation = () => {
    try {
        fetchcall('access_token', (token) => {
            let url = `${spotify_uri}//recommendations?limit=5&seed_tracks=[].join(',')}`
            const config = {
                method: 'put',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            AxiosReq(config).then(result1 => {
                topTracksIds = result1.items?.map(({ id }) => id);
                //return topTracksIds
                console.log(topTracksIds)
            })
        })
    } catch (error) {

    }
} */