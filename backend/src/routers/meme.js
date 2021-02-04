const express = require('express')
const Meme = require('../models/meme')
const router = new express.Router()

router.post('/memes', async (req, res) => {
    const meme = new Meme({
        ...req.body
    })

    try {
        await meme.save()
        res.status(201).send(meme)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/memes', async (req, res) => {

    Meme.find({}).sort({ createdAt: 'desc' }).limit(100).then((memes) => {
        res.send(memes)
    }).catch((e) => {
        res.status(500).send()
    })
})

module.exports = router