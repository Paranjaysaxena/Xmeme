const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    caption: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

// To avoid Duplicate Entries
memeSchema.index({ name: 1, caption: 1, url: 1 }, { unique: true })

const Meme = mongoose.model('Meme', memeSchema)

module.exports = Meme