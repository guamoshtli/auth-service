const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Role = require('./role');
const UserRole = require('./userRole');
const Company = require('./company');
const UserCompany = require('./userCompany');

// Asociaciones
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });

const db = {
  Sequelize,
  sequelize,
  User,
  Role,
  UserRole,
  Company,
  UserCompany
};

module.exports = db;
