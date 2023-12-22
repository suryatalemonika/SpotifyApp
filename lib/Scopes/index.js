const returnSCope = () => {
    try {
        let result;
        switch (scope) {
            case 'transfetPlayback':
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