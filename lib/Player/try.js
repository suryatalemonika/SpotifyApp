const { GetAvailableDevices } = require('./path-to-your-module');  // Import your module

app.get('/devices', async (req, res) => {
    try {
        let devices = await GetAvailableDevices();
        console.log(`-----${devices}`);
        res.status(200).send(devices);
    } catch (error) {
        console.error(`Error getting devices: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

exports.GetAvailableDevices = async () => {
    try {
        const token = await fetchAccessToken('access_token'); // Assuming fetchAccessToken is a function to get the token

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
            return 'no devices found';
        }
    } catch (error) {
        console.error(`${new Date().toJSON()} - got error while getting devices  ${error}`);
        throw error;  // Propagate the error to the calling function
    }
};
