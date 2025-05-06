'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cultura extends Model {
    static associate(models) {
      Cultura.hasMany(models.Silo, {
        foreignKey: 'cultura_id'
      }) 
    }
  }
  Cultura.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cultura',
    tableName: 'culturas'
  });
  return Cultura;
};