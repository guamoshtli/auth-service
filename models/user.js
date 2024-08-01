/**
 * Archivo que contiene la definición del modelo de usuario.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const UserRole = require('./userRole');

/**
 * Clase que representa el modelo de usuario.
 */
class User extends Model {}

/**
 * Inicializa el modelo de usuario con sus atributos y configuración.
 */
User.init({
  /**
   * Atributo que representa el nombre de usuario.
   */
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /**
   * Atributo que representa el correo electrónico del usuario.
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  /**
   * Atributo que representa la contraseña del usuario.
   */
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  /**
   * Objeto de conexión a la base de datos.
   */
  sequelize,
  /**
   * Nombre del modelo.
   */
  modelName: 'User',
  /**
   * Configuración para agregar timestamps (created_at y updated_at) a cada registro.
   */
  timestamps: true
});

/**
 * Asociación entre el modelo de usuario y el modelo de usuario-rol.
 * Un usuario puede tener muchos roles.
 */
User.hasMany(UserRole);

/**
 * Exporta el modelo de usuario.
 */
module.exports = User;