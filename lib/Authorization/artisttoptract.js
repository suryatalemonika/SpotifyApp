

const { spotify_uri } = require('../Constants/config');
const { requestToEndPoint } = require('./fetchingapi');
let a_id =  '0oOet2f43PA68X5RxKobEy'//'3TUNkjIHkcvEy9oeK2D4hU'
const url = `${spotify_uri}artists/${a_id}/top-tracks`;

console.log(url);
requestToEndPoint(url,{
    market: 'UA'
  })
    .then((re) => {
        console.log(`this is a response from requestToEndPoint `);
        console.log(re);
    }).catch((e) => {
        console.log(e.data);
    })
