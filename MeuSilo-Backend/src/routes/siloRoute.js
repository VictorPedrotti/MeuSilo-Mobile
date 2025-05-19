const { Router } = require('express');
const SiloController = require('../controllers/SiloController.js');
const { validaAutenticacao } = require('../utils/auth.js');

const siloController = new SiloController();

const router = Router();

router.use(validaAutenticacao);

router.get('/silos', (req, res) => siloController.pegaTodos(req, res));
router.get('/silos/:id', (req, res) => siloController.pegaUmPorId(req, res));
router.post('/silos', (req, res) => siloController.criaNovo(req, res));
router.put('/silos/:id', (req, res) => siloController.atualiza(req, res));
router.delete('/silos/:id', (req, res) => siloController.exclui(req, res));

module.exports = router;