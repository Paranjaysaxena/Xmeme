const express = require('express')
const Meme = require('../models/meme')
const router = new express.Router()

router.post('/memes', async (req, res) => {
    const meme = new Meme({
        ...req.body
    })

    try {
        await meme.save()
        res.status(201).send(meme._id)
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

router.get('/memes/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const meme = await Meme.findById(_id).exec()

        if (!meme) {
            return res.status(404).send()
        }

        res.status(201).send(meme)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/memes/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['caption', 'url']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const meme = await Meme.findOne({ _id: req.params.id })

        if (!meme) {
            return res.status(404).send()
        }

        updates.forEach((update) => meme[update] = req.body[update])
        await meme.save()
        res.send(meme)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router