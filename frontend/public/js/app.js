const memeForm = document.querySelector('form')

memeForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    var memeName = document.getElementById("name")
    var memeCaption = document.getElementById("caption")
    var memeUrl = document.getElementById("url")

    const meme = {
        'name': memeName.value,
        'caption': memeCaption.value,
        'url': memeUrl.value
    }

    await fetch('http://localhost:3000/memes', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(meme),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));

    console.log(meme)
})

