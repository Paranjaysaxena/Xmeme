const express = require('express')
require('./db/mongoose')
const memeRouter = require('./routers/meme')

const app = express()
const port = process.env.PORT || 3000

var cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(memeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})