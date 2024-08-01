const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const UserRole = require('./userRole');

class User extends Model {}

User.init({
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
  timestamps: true
});

// Asociaciones

User.hasMany(UserRole);

module.exports = User;
