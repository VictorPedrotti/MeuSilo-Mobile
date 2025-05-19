const express = require('express');
const usuarios = require('./usuarioRoute.js');
const culturas = require('./culturaRoute.js');
const silos = require('./siloRoute.js');

module.exports = app => {
  app.use(
    express.json(),
    usuarios,
    culturas,
    silos
  );
};