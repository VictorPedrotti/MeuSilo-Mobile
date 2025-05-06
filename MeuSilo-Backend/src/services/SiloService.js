const Services = require('./Services.js');

class SiloService extends Services {
  constructor(){
    super('Silo');
  }
}

module.exports = SiloService;