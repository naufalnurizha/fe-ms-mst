const axios = require('axios');

const localApi = axios.create({
  timeout: 30000,
  baseURL: 'http://localhost:3001/',
  headers: { 'Content-Type': 'application/json' },
});

module.exports = localApi;