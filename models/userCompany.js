const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./company') 

class UserCompany extends Model {}

UserCompany.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Companies',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserCompany',
  timestamps: true,
});

UserCompany.belongsTo(Company);

module.exports = UserCompany;
