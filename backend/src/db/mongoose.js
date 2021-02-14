const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/meme-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
