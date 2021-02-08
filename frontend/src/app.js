const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { dirname } = require("path")
const fetch = require("node-fetch")

const app = express()
const port = process.env.PORT || 8080

var cors = require('cors')

app.use(cors())

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('/', async (req, res) => {

    await fetch('http://localhost:3000/memes').then(response => response.json())
        .then(data => {
            allMemes = data
        });;

    res.render('index', {
        'allMemes': allMemes
    })
})

app.listen(port, () => {
    console.log("Server is up on 8080")
})