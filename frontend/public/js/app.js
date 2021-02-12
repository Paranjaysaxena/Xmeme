const memeForm = document.getElementById('myForm')

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

    await fetch('http://localhost:8081/memes', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(meme),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))

})

const searchForm = document.getElementById('searchForm')

myfun = async function () {
    await fetch('http://localhost:8081/memes', {
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(data => {
            myFun2(data)
        });
}

myfun()

myFun2 = function (totalMemes) {
    const Memes = document.getElementById("allMemes")

    Memes.innerHTML = ""

    totalMemes.forEach(meme => {
        Memes.innerHTML += '<div class="meme" id="Meme">' +
            '<h4 class="owner" id="memeOwner">' + meme.name + '</h4>' +
            '<div class="caption" id="memeCaption">' + meme.caption + '</div>' +
            '<div class="pic-container" id="memePic-container"><img class="pic" id="memePic" src="' + meme.url + '" alt="image" height="350px" width="350px"></div>' +
            '<div>' +
            '<button class="bttn" onclick="Edit(\'' + meme._id + '\', \'' + meme.caption + '\',\'' + meme.url + '\')">edit</button>' +
            '<button class="bttn" onclick="Delete(\'' + meme._id + '\')">delete</button>' +
            '</div>' +
            '</div><br><br><br>'
    })
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    var ownerName = document.getElementById("findOwner")

    searchedMemes = [];

    await fetch('http://localhost:8081/memes').then(response => response.json())
        .then(data => {
            data.forEach(meme => {
                if (ownerName.value) {
                    if (meme.name == ownerName.value) {
                        searchedMemes.push(meme)
                    }
                } else {
                    searchedMemes.push(meme)
                }
            });
            console.log(searchedMemes)
            myFun2(searchedMemes)
        });
})


async function Edit(memeId, memeCaption, memeUrl) {

    var defaultCaption = memeCaption
    var memeCaption = prompt("Enter the caption", defaultCaption)

    var defaultUrl = memeUrl
    var memeUrl = prompt("Enter the url", defaultUrl)

    const meme = {
        'caption': memeCaption,
        'url': memeUrl
    }

    await fetch('http://localhost:8081/memes/' + memeId, {
        mode: 'cors',
        method: "PATCH",
        body: JSON.stringify(meme),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));

    setTimeout((function () { window.location.reload(); }), 10);
}

async function Delete(memeId) {

    await fetch('http://localhost:8081/memes/' + memeId, {
        mode: 'cors',
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));

    setTimeout((function () { window.location.reload(); }), 10);
}
