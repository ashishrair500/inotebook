const connectToMongo = require('./db');    //like importing   mogooses modules

const express = require('express')    //express modules 

connectToMongo();                 //function to connect ith mongodb 

const app = express();             //taking referece of express

const port = 5000

app.use(express.json())  //middleware-used in an Express.js application to enable middleware that parses incoming request bodies with JSON payloads.
 
app.get('/', (req, res) => {
    res.send('hello harry')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})  