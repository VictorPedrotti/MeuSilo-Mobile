const Controller = require('./Controller.js');
const SiloService = require('../services/SiloService.js'); 

class SiloController extends Controller {
  constructor() {
    super(new SiloService());
  }
}

module.exports = SiloController;