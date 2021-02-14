<h1 align="center">
  <br>
  <a href="https://paranjaya-xmeme.herokuapp.com/"><img src="https://github.com/Paranjaysaxena/Xmeme/blob/main/frontend/public/img/logo.png" alt="Xmeme" width="200"></a>
</h1>

## [Live Demo](https://paranjaya-xmeme.herokuapp.com/)

## A simple Meme streaming application that uses a REST API which allowes CRUD operations on memes. Features include:

- Viewing top 100 memes of server responses to avoid slow page load times.
- Form for posting a Meme.
- Search memes for a particular owner.
- Update and Delete a Meme.
- [Swagger API docs](https://paranjaya-xmeme-api.herokuapp.com/swagger-ui/).
- Docker Solution for the server.
- Publicly deployed HTTPS links.

### SETUP INSTRUCTIONS

Node.js version 14+ and npm must be installed on your machine. MongoDb must be installed and runing on port:27017. In terminal type the following commands to run the api server:

```
git clone https://github.com/Paranjaysaxena/Xmeme.git
cd backend
sudo npm install
npm start
```

In another terminal to run the application

```
cd frontend
sudo npm install
npm start
```

## Server

The server is made on `nodejs` (v14.15.4)

`Express.js` is used as the server framework

## NPM Library

- `cors` - to provide a Connect/Express middleware that can be used to enable CORS .

- `swagger-jsdocs & swagger-ui-express` - to create swagger documentation.

- `mongoose` - MongoDB library for JS.

- `hbs` - to render hbs files.

## API

- The base path of the API is `https://paranjaya-xmeme-api.herokuapp.com/`

- The various requests and endpoints are:-

  - POST `/memes` - to create meme.

  - GET `/memes` - to get all memes.

  - GET `/memes/{id}` - to get a particular meme.

  - PATCH `/memes/{id}` - to update a particular meme.

  - DELETE `/memes/{id}` - to delete a particular meme.

- Use POSTMAN to fire off the requests to the endpoints.

## Docker

- To run docker solution, after cloning the repo.

```
docker build -t xmeme_app .
docker-compose up
```
