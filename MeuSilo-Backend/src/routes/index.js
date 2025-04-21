const express = require('express');
const usuarios = require('./usuarioRoute.js');

module.exports = app => {
  app.use(
    express.json(),
    usuarios,
  );
};