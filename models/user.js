/**
 * Archivo que contiene la definición del modelo de usuario.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Clase que representa el modelo de usuario.
 */
class User extends Model {}

/**
 * Inicializa el modelo de usuario con sus atributos y configuración.
 */
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true
});

/**
 * Exporta el modelo de usuario.
 * Las asociaciones se manejan en models/index.js.
 */
module.exports = User;
