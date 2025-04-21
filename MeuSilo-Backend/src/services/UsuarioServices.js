const Services = require('./Services.js');
const dataSource = require('../database/models');
const usuario = require('../database/models/usuario.js');

class UsuarioServices extends Services {
  constructor(){
    super('Usuario');
  }

  async buscaUsuarioPorCredencial(email, senha) {
    const usuario = await dataSource['Usuario'].findOne({ where: { email } });

    if (usuario && await usuario.validarSenha(senha)) {
      return usuario
    }
    return null;
  }

  async buscaPorEmail(email){
    const usuario = await dataSource['Usuario'].findOne({ where: { email } });
    return usuario
  }
}

module.exports = UsuarioServices;