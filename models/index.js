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

// Asociación entre usuario y rol (muchos a muchos)
User.belongsToMany(Role, { 
  through: UserRole, 
  foreignKey: 'userId',
  otherKey: 'roleId' 
});

Role.belongsToMany(User, { 
  through: UserRole, 
  foreignKey: 'roleId',
  otherKey: 'userId' 
});

// Asociación entre usuario y empresa (muchos a muchos)
User.belongsToMany(Company, { 
  through: UserCompany, 
  foreignKey: 'userId',
  otherKey: 'companyId' 
});

Company.belongsToMany(User, { 
  through: UserCompany, 
  foreignKey: 'companyId',
  otherKey: 'userId' 
});

// Relaciones adicionales (opcional, para consultas directas)
User.hasMany(UserRole, { foreignKey: 'userId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserCompany, { foreignKey: 'userId' });
UserCompany.belongsTo(User, { foreignKey: 'userId' });

Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

Company.hasMany(UserCompany, { foreignKey: 'companyId' });
UserCompany.belongsTo(Company, { foreignKey: 'companyId' });

/**
 * Objeto que contiene la configuración y modelos de la base de datos.
 */
const db = {
  Sequelize,
  sequelize,
  User,
  Role,
  UserRole,
  Company,
  UserCompany
};

/**
 * Exporta la configuración y modelos de la base de datos.
 */
module.exports = db;
