const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');

const UserRole = sequelize.define('UserRole', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Role',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

UserRole.belongsTo(Role);

module.exports = UserRole;