const express = require('express')
require('./db/mongoose')
const memeRouter = require('./routers/meme')

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

// PORT
const port = 8081

var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(memeRouter)

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})