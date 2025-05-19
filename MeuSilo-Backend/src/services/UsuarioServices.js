const Services = require('./Services.js');
const dataSource = require('../database/models');

class UsuarioServices extends Services {
  constructor(){
    super('Usuario');
  }

  async buscaUsuarioPorCredencial(email, senha) {
    const usuario = await dataSource['Usuario'].findOne({ where: { email } });

    if (usuario && await usuario.validarSenha(senha)) {
      return usuario;
    }
    return null;
  }

  async buscaPorEmail(email){
    const usuario = await dataSource['Usuario'].findOne({ where: { email } });
    return usuario;
  }

  async buscaSilosPorUsuario(id) {
    const usuario = await super.pegaUmRegistroPorId(id);
    const listaSilos = await usuario.getSilosUsuario();
    return listaSilos;
  }
}

module.exports = UsuarioServices;