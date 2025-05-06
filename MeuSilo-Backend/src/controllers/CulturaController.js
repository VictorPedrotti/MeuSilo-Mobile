const Controller = require('./Controller.js');
const CulturaService = require('../services/CulturaService.js'); 

const culturaService = new CulturaService();

class CulturaController extends Controller {
  constructor() {
    super(culturaService);
  }
}

module.exports = CulturaController;