const crypto = require('crypto');
const { InsertData, FindData } = require('../Database/connection');

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.randomBytes(length);
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

const sha256 = (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return Promise.resolve(hash.digest());
};

const base64encode = (input) => {
  const encoded = Buffer.from(input).toString('base64');
  return encoded
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const dboperatin = (cb) => {
  InsertData({ codeVerifier: generateRandomString(64) }, 'codeVerifier')
    .then((res) => {
      if (res) {
        cb(res)
      } else {
        cb(false)
      }
    }).catch((er) => { console.log(`error ${er}`) })
}
const fetchcall = (type, cb) => {
  FindData(type)
    .then((res) => {
      cb(res)
    })
    .catch((er) => { console.log(`error in fetching ${er}`) })
}
module.exports = {
  base64encode,
  sha256,
  generateRandomString,
  dboperatin,
  fetchcall
}