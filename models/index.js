/**
 * Archivo que contiene la configuración y asociaciones de los modelos de la base de datos.
 */

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Role = require('./role');
const UserRole = require('./userRole');
const Company = require('./company');
const UserCompany = require('./userCompany');

/**
 * Asociaciones entre los modelos de la base de datos.
 */

/**
 * Asociación entre el modelo de usuario y el modelo de rol.
 * Un usuario puede tener muchos roles y un rol puede tener muchos usuarios.
 */
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

/**
 * Asociación entre el modelo de usuario y el modelo de empresa.
 * Un usuario puede tener muchas empresas y una empresa puede tener muchos usuarios.
 */
User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });

/**
 * Objeto que contiene la configuración y modelos de la base de datos.
 */
const db = {
  /**
   * Clase Sequelize para la creación de modelos y consultas a la base de datos.
   */
  Sequelize,
  /**
   * Objeto de conexión a la base de datos.
   */
  sequelize,
  /**
   * Modelo de usuario.
   */
  User,
  /**
   * Modelo de rol.
   */
  Role,
  /**
   * Modelo de usuario-rol.
   */
  UserRole,
  /**
   * Modelo de empresa.
   */
  Company,
  /**
   * Modelo de usuario-empresa.
   */
  UserCompany
};

/**
 * Exporta la configuración y modelos de la base de datos.
 */
module.exports = db;