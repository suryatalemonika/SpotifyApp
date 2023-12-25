const scheduler = require('node-schedule');

scheduler.scheduleJob('*/55 * * * *', () => {
    console.log('You need to generate a new code for code verifications')
})

scheduler.scheduleJob('0 * * * *', () => {
    const gtoken = require('../Authorization/generatetoken.js');
    console.log('this will run at every hour')
})

