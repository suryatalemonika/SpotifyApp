const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const reqs = require('../axios/axios')
let port = 8080
app.use(bodyParser.json())

app.get('',(req,res)=>{
    res.send('server is running successfully');
})

app.post('/artist',(req,res)=>{
    console.log(req.body)
    res.send(reqs.Get(req.body.token,req.body.id));
})
app.get('/toptracks',(req,res)=>{
    res.send(reqs.TopTracks(req.body.token,req.body.id,req.body.country));
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})