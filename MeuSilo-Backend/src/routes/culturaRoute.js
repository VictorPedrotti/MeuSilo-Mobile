const { Router } = require('express');
const CulturaController = require('../controllers/CulturaController.js');

const culturaController = new CulturaController();

const router = Router();

router.get('/culturas', (req, res) => culturaController.pegaTodos(req, res));
router.get('/culturas/:id', (req, res) => culturaController.pegaUmPorId(req, res));
router.post('/culturas', (req, res) => culturaController.criaNovo(req, res));
router.put('/culturas/:id', (req, res) => culturaController.atualiza(req, res));
router.delete('/culturas/:id', (req, res) => culturaController.exclui(req, res));

module.exports = router;