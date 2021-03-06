<h1 align="center">
  <br>
  <img src="https://github.com/Paranjaysaxena/Xmeme/blob/main/frontend/public/img/logo.png" alt="Xmeme" width="200">
</h1>


## A simple Meme streaming application that uses a REST API which allowes CRUD operations on memes. Features include:

- Viewing top 100 memes of server responses to avoid slow page load times.
- Form for posting a Meme.
- Search memes for a particular owner.
- Update and Delete a Meme.
- Swagger API docs.
- Docker Solution for the server.
- Publicly deployed HTTPS links.
- Error handling for all routes.
- Duplicate POST request from same payload gives error.
- Modular, well-commented and documented code.
- lean() function when large number of memes are present to improve performance.

### SETUP INSTRUCTIONS

Node.js version 14+ and npm must be installed on your machine. MongoDb must be installed and runing on port:27017. In terminal type the following commands to run the api server:

```
git clone https://github.com/Paranjaysaxena/Xmeme.git
cd backend
sudo npm install
npm run dev
```

In another terminal to run the application

```
cd frontend
sudo npm install
npm run dev
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
