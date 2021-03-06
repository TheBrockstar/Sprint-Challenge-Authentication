const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;
const bcrypt = require('bcryptjs');

// Instantiate Database
const db = require('../database/dbConfig.js')

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', getJokes);
};

function register(request, response) {
  const credentials = request.body;

  const hash = bcrypt.hashSync(credentials.password, 15);
  credentials.password = hash;

  db('users')
  .insert(credentials)
  .then(ids => {
    const id = ids[0];
    const token = jwt.sign({ username: credentials.username }, jwtKey, { expiresIn: '10m' });
    response.status(201).json({ newUser: id, token  })
  })
  .catch( error => {
    response.status(500).json(error);
  })
}

function login(request, response) {
  const credentials = request.body;

  db('users')
  .where({ username: credentials.username })
  .then(user => {
    user = user[0]
    if (user) {
      const token = jwt.sign({ username: credentials.username }, jwtKey, { expiresIn: '10m' });
      response.status(200).json({ welcome: user, token })
    } else {
      response.status(401).json({ notAuthorized: "Unable to find a user with the provided credentials." })
    }
  })
  .catch ( error => {
    response.status(500).json(error)
  })
}

function getJokes(request, response) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(jokes => {
      response.status(200).json(jokes.data);
    })
    .catch(error => {
      response.status(500).json({ message: 'Error Fetching Jokes', error: error });
    });
}
