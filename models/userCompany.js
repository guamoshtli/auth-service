const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = UserCompany;
