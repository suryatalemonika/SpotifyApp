const { spotify_uri } = require("../Constants/config");
const { fetchcall } = require("../Authorization/helper");
const { AxiosReq } = require("./api");
const { InsertData } = require("../Database/connection");

exports.GetAvailableDevices = () => {
    try {
        return fetchcall('access_token', (token) => {
            const config = {
                method: 'get',
                url: `${spotify_uri}me/player/devices`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            return AxiosReq(config).then(re => {
                console.log(re)
                if (re.devices.length > 0) {
                    re.devices.forEach(spotifyDevice => {
                        console.log(`having devices with name ${spotifyDevice.name}`)
                        console.log(`device id is ${spotifyDevice.id}`)
                        InsertData({ device_id: spotifyDevice.id }, 'device_id').then((res) => { console.log(`device_id insertion done`) }).catch((er) => { console.log(`error ${er}`) })
                    });
                } else {
                    console.log('no devices found');
                }
                return re;
            });
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting devices  ${error}`)
    }
}
exports.setVolume = (speechResult) => {
    try {
        return fetchcall('access_token', (token) => {
            return fetchcall('device_id', (deviceid) => {
                const url = `${spotify_uri}me/player/volume`;
                const config = {
                    method: 'put',
                    url: url,
                    device_id: deviceid,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        volume_percent: speechResult,
                    }
                };
                return AxiosReq(config).then(result1 => {
                    console.log(`result1 is ${result1}`)
                    return result1
                });
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while setting volume  ${error}`)
    }
}

exports.PauseSong = () => {
    try {
        fetchcall('access_token', (token) => {
            fetchcall('device_id', (deviceid) => {
                const url = `${spotify_uri}me/player/pause`;
                const config = {
                    method: 'put',
                    url: url,
                    device_id: deviceid,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                };
                AxiosReq(config)
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while pausing song ${error}`)
    }
}

exports.PlaySong = () => {
    try {
        fetchcall('access_token', (token) => {
            fetchcall('device_id', (deviceid) => {
                const url = `${spotify_uri}me/player/play`;
                const config = {
                    method: 'put',
                    url: url,
                    device_id: deviceid,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                };
                AxiosReq(config)
            })
        })
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

exports.NextSong = () => {
    try {
        return fetchcall('access_token', (token) => {
            fetchcall('device_id', (deviceid) => {
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
                return AxiosReq(config).then(result1 => {
                    return result1
                })
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing next song ${error}`)
    }
}

exports.PreviousSong = () => {
    try {
        return fetchcall('access_token', (token) => {
            fetchcall('device_id', (deviceid) => {
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
                return AxiosReq(config).then(result1 => {
                    return result1
                })
            })
        })
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while playing previous song ${error}`)
    }
}

exports.GetState = () => {
    try {
        return fetchcall('access_token', (token) => {
            const url = `${spotify_uri}me/player`;
            const config = {
                method: 'get',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            return AxiosReq(config).then(result1 => {
                console.log(`result1 is ${result1}`)
                console.log(result1.item)
                return result1
            });
        })
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


exports.GetSongDetails = (songname) => {
    try {
        fetchcall('access_token', (token) => {
            let config = {
                method: 'get',
                url: `${spotify_uri}search`,
                params: {
                    q: songname,
                    type: 'track',
                    limit: 1,
                    offset: 1,
                    include_external: 'audio',
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            AxiosReq(config).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    } catch (error) {
        console.log(`${new Date().toJSON()} - got error while getting song detaiils  ${error}`)
    }
}

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