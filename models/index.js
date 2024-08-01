const User = require('./user');
const Role = require('./role');
const UserRole = require('./userRole');
const Company = require('./company');
const UserCompany = require('./userCompany');
const sequelize = require('../config/database');

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });

module.exports = {
  sequelize,
  User,
  Role,
  UserRole,
  Company,
  UserCompany
};
