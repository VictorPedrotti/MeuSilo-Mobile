const Controller = require('./Controller.js');
const SiloService = require('../services/SiloService.js'); 

const siloService = new SiloService();

class SiloController extends Controller {
  constructor() {
    super(siloService);
  }
}

module.exports = SiloController;