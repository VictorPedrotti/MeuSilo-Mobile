const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const usuarioController = new UsuarioController();
const router = Router();

router.get('/login', (req,res) => usuarioController.loginUsuario(req, res));
router.get('/usuarios', (req,res) => usuarioController.pegaTodos(req, res));
router.post('/cadastro', (req, res) => usuarioController.criaNovo(req, res));
router.delete('/usuarios/:id', (req, res) => usuarioController.exclui(req, res));

module.exports = router;