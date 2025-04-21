const Controller = require('./Controller.js');
const UsuarioServices = require('../services/UsuarioServices.js');
const jwt = require('../utils/jwt.js');
const usuarioServices = new UsuarioServices();

class UsuarioController extends Controller {
  constructor() {
    super(usuarioServices);
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {

      const usuarioExistente = await this.entidadeService.buscaPorEmail(dadosParaCriacao.email);
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado.' });
      }
      
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      const { senha, ...user } = novoRegistroCriado.dataValues;

      const token = jwt.sign({ user: user.id });
      return res.status(201).json({ user, token });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async loginUsuario(req, res) {
    const [, hash] = req.headers.authorization.split(' ')
    const [email, senha] = Buffer.from(hash, 'base64').toString().split(':')

    try {
      const usuario = await this.entidadeService.buscaUsuarioPorCredencial(email, senha)

      if (!usuario) {
        return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
      }

      const { senha: hashedSenha, ...user } = usuario.dataValues;
      const token = jwt.sign({ user: user.id });

      return res.status(200).json({ user, token });
    } catch (erro) {
      return res.status(401).json({ erro: erro.message });  
    }
  }
}

module.exports = UsuarioController;