const { response } = require('express')
const express = require('express')
const Meme = require('../models/meme')
const router = new express.Router()

// Routes
// POST a meme
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

// GET request for all Memes
router.get('/memes', async (req, res) => {
    // Sort by latest timestamps and limit 100
    Meme.find({}).sort({ createdAt: 'desc' }).limit(100).lean().then((memes) => {
        res.status(200).send(memes)
    }).catch((e) => {
        res.status(500).send()
    })
})

// GET request for a single Meme
router.get('/memes/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const meme = await Meme.findById(_id).exec()
        if (!meme) {
            return res.status(404).send()
        }
        res.status(200).send(meme)
    } catch (e) {
        res.status(500).send()
    }
})

// PATCH request for a Meme
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
        res.status(200).send(meme)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/memes/:id', async (req, res) => {
    try {
        const meme = await Meme.findOneAndDelete({ _id: req.params.id })

        if (!meme) {
            return res.status(404).send()
        }

        res.status(200).send()

    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router