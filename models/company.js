const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Company extends Model {}

Company.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Company',
  timestamps: true,
});

module.exports = Company;
