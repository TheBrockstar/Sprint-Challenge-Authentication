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
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 15);
  credentials.password = hash;

  db('users')
  .insert(credentials)
  .then(ids => {
    const id = ids[0];
    const token = jwt.sign({ username: credentials.username }, jwtKey, { expiresIn: '10m' });
    res.status(200).json({ newUser: id, token  })
  })
  .catch( error => {
    response.status(500).json(err);
  })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
