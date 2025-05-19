'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Silo extends Model {
    static associate(models) {
      Silo.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
      }),
      Silo.belongsTo(models.Cultura, {
        foreignKey: 'cultura_id'
      });
    }
  }
  Silo.init({
    nome: DataTypes.STRING,
    capacidade: DataTypes.DOUBLE,
    armazenado: DataTypes.DOUBLE,
    usuario_id: DataTypes.INTEGER,
    cultura_id: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Silo',
  });
  return Silo;
};