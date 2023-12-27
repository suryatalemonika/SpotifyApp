const returnSCope = (scope) => {
    try {
        let result;
        switch (scope) {
            case 'transfetPlayback':
            case 'getstate':
                result = 'user-read-playback-state'
                break;
            case 'playlists':
                result = 'user-modify-playback-state'
                break;
            case 'tracks':
                result = ''
                break;
            default:
                break;
        }
        return result;
    } catch (error) {
        console.log(`error while getting scope ${scope}`)
    }
}

module.exports = {
    returnSCope
}